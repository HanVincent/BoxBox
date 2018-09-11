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

// temp all boxes
const boxes = new Boxes();
const attacks = new Attacks();

// Create computer boxes
const NUM = 10;
for(let comID = 0; comID < NUM; comID++){
    boxes.addBox(comID, "", true);
}

function gameUpdate() {
    io.emit('boxes', boxes.getBoxes());
    io.emit('attacks', attacks.getAttacks());
    io.emit('board', attacks.getBoard());
}

io.on('connection', (socket) => {
    console.log("New user connected: " + socket.id);
    
    const name = socket.handshake.query.name
    const box = boxes.addBox(socket.id, name);
    attacks.updateBoard(box);
    gameUpdate();

    // console.log(boxes.getBoxes());
    socket.on('keypress', (pressed, callback) => {
        // console.log(pressed);

        if (!boxes.getBox(socket.id)) return;

        pressed.forEach((each) => {
            switch (each) {
                case 'w':
                    boxes.move(socket.id, -1);
                    break;
                case 's':
                    boxes.move(socket.id, 1);
                    break;
                case 'd':
                    boxes.rotate(socket.id, 1);
                    break;
                case 'a':
                    boxes.rotate(socket.id, -1);
                    break;
                case 'k':
                    attacks.addAttack(boxes.getBox(socket.id));
                    attacks.checkAttacks(boxes.getBoxes());
                    break;
            }
        })

        gameUpdate();
        boxes.checkAnyDead(gameUpdate);
        attacks.updateAttacks();
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);

        boxes.removeBox(socket.id);
        attacks.removeBoard(socket.id);
        io.emit('remove', socket.id); // TODO: workaround for disconnecting user
        io.emit('boxes', boxes.getBoxes());
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

