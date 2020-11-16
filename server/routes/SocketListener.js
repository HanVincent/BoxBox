const socketIO = require('socket.io');
const SocketEventHandler = require("../services/SocketEventHandler");
const GAME = require("../config/game");

class SocketListener {

    constructor(server) {
        const io = socketIO(server);
        io.on("connect", (socket) => {
            console.debug("Socket id: " + socket.id + " connected.");

            SocketEventHandler.connect(socket.id, socket.handshake.query.name);

            socket.on("start-broadcast", () => {
                socket.emit("polling", SocketEventHandler.polling());
            });

            socket.on("key-press", (pressed) => {
                SocketEventHandler.keyPressed(socket.id, pressed);
                io.emit("polling", SocketEventHandler.polling());
                SocketEventHandler.clearAttacks();
            });

            socket.on("disconnect", () => {
                SocketEventHandler.disconnect(socket.id);
            });

            socket.emit("init", GAME);
        });
    }

}

module.exports = SocketListener