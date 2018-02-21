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
    io.emit('update', boxes.getBoxes());

    console.log(boxes.getBoxes());
    socket.on('keypress', (pressed, callback) => {
        console.log(pressed);

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

            }
        })

        io.emit('update', boxes.getBoxes());
        // callback(boxes);
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

