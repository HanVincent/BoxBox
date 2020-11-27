"use strict";

console.debug = function () {
};

function startGame(event) {
    event.preventDefault();

    // get name and hide modal
    const value = document.getElementById("name").value;
    const name = value.trim().substring(0, 10) || "";
    document.getElementById("start-modal").style.display = "none";

    const controller = new Controller(name);
}

class Controller {

    constructor(name) {
        this.socket = io("", {query: `name=${name}`});
        this.setupSocketListener();
    }

    setupSocketListener() {
        this.socket.on("init", data => {
            window.GAME = data;

            this.model = new Model();

            const keyEventHandler = (e) => {
                this.model.updateKeys(e, (pressed) => {
                    this.socket.emit("key-press", pressed);
                });
            }

            document.addEventListener("keydown", keyEventHandler);
            document.addEventListener("keyup", keyEventHandler);

            setTimeout(() => {
                this.socket.emit("start-broadcast");
            }, 300);
        });

        this.socket.on("polling", data => {
            this.model.updateStatus(this.socket.id, data.boxes);
            this.model.updateAttack(data.attacks);
            this.model.updateBoard(data.board);
            this.model.updateDeadAndRebornBoxes(data.deadAndReborn);
        });
    }

}
