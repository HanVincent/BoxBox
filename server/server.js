const path = require('path'); // for directory
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// some objects from utils
const { Boxes } = require('./utils/Boxes');
const { Attacks } = require('./utils/Attacks');

const publicPath = path.join(__dirname, '../public'); // get static file loc
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

const boxes = new Boxes();
const attacks = new Attacks();

// Create computer boxes
const FAKE_NUM = 10;
for (let comID = 0; comID < FAKE_NUM; comID++) {
    boxes.addBox(comID, "", true);
}

function broadcast() {
    attacks.updateBullets();
    attacks.checkAttacks(boxes.getLiveBoxes());

    io.emit('boxes', boxes.getBoxes());
    io.emit('attacks', attacks.getAttacks());
    io.emit('board', attacks.getBoard());
    io.emit('deadAndReborn', { dead: boxes.getDeadBoxes(), reborn: boxes.checkReborn() })

    // TODO: not good
    attacks.updateAttacks(); // if io.emit is not sync, then why it works?
}

setInterval(broadcast, 1000 / 20);

io.on('connection', (socket) => {
    console.log("New user connected: " + socket.id);
    socket.emit('init', 'test');

    const box = boxes.addBox(socket.id, socket.handshake.query.name);
    attacks.addBoxToBoard(box);
    broadcast();

    socket.on('keypress', (pressed, callback) => {
        if (boxes.getBox(socket.id).isDead) return;

        if (pressed.forward) boxes.move(socket.id, -1);
        if (pressed.backward) boxes.move(socket.id, 1);
        if (pressed.right) boxes.rotate(socket.id, 1);
        if (pressed.left) boxes.rotate(socket.id, -1);
        if (pressed.change) boxes.change(socket.id);
        if (pressed.attack) attacks.addAttack(boxes.getBox(socket.id));

        broadcast();
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);

        boxes.removeBox(socket.id);
        attacks.removeBullet(socket.id);
        attacks.removeBoxFromBoard(socket.id);

        io.emit('remove', socket.id); // TODO: workaround for disconnecting user
        broadcast();
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

