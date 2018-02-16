const path = require('path'); // for directory
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// some utils js
const { Boxes } = require('./utils/boxes');

const publicPath = path.join(__dirname, '../public'); // get static file loc
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

// temp all boxes
const boxes = new Boxes();

io.on('connection', (socket) => {
    console.log("New user connected");

    boxes.addBox(socket.id); //name

    socket.on('keypress', (pressed, callback) => {
        console.log(pressed);

        pressed.forEach((each) => {
            switch (each) {
                case 'w':
                    boxes.getBox(socket.id).move(-1);
                    break;
                case 's':
                    boxes.getBox(socket.id).move(1);
                    break;
                case 'd':
                    boxes.getBox(socket.id).rotate(1);
                    break;
                case 'a':
                    boxes.getBox(socket.id).rotate(-1);
                    break;

            }
        })

        socket.emit('updateMe', boxes.getBox(socket.id));
        socket.broadcast.emit('update', boxes.getBoxes());
        // callback(boxes);
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

