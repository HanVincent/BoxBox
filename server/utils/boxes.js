const { MAP, BOX } = require('../config/game');

class Boxes {
    constructor(id) {
        this.boxes = [];
    }

    addBox(id, name) {
        this.boxes.push({
            id,
            name,
            x: Math.floor(Math.random() * (MAP.maxWidth - BOX.size)),
            y: Math.floor(Math.random() * (MAP.maxHeight - BOX.size)),
            angle: 0,

            blood: BOX.maxBlood,
            bullet: BOX.maxBullet,

            // TODO: Refactor? 獨立成一個 class
            kill: 0,
            die: 0
        });
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

    // used for each box
    move(id, direction) {
        const box = this.getBox(id);
        const radian = box.angle * (Math.PI / 180);
        box.x -= direction * Math.sin(radian) * BOX.vx;
        box.y += direction * Math.cos(radian) * BOX.vy;
        
        box.x = Math.max(0, Math.min(MAP.maxWidth, box.x));
        box.y = Math.max(0, Math.min(MAP.maxHeight, box.y));
    }
    rotate(id, direction) {
        const box = this.getBox(id);
        box.angle += direction * BOX.vrot; // only step 1
        box.angle %= 360;
    }
}

module.exports = { Boxes };