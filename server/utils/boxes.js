const { Box } = require('./box');

class Boxes {
    constructor(id) {
        this.boxes = [];
    }

    addBox(id, name) {
        this.boxes.push(new Box(id, name));
        // return box?
    }
    removeBox(id) {
        this.boxes = this.boxes.filter(box => box.id !== id);
        // return box?
    }
    getBox(id) {
        return this.boxes.filter(box => box.id === id)[0];
    }
    getBoxes() { // room
        return this.boxes;
        // const boxes = this.boxes.filter(box => box.room === room);
    }

    getBoard() {
        return this.boxes.map(box => {
            return {
                name: box.name,
                kill: box.kill,
                die: box.die,
            };
        });
    }
}

module.exports = { Boxes };