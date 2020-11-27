const {MAP, BOX} = require("../config/game");
const {genLoc, isCollidedWithBoxes} = require("../lib/utils");

const BoxModel = require("../models/BoxModel")

class BoxComponent {
    constructor() {
        this.boxes = {};
    }

    addBox(id, name = "", isFake = false) {
        let [x, y] = genLoc();
        while (isCollidedWithBoxes(x, y, this.getBoxes())) {
            [x, y] = genLoc();
        }
        const box = new BoxModel(id, name, x, y, isFake);
        this.boxes[id] = box;
        return box;
    }

    move(id, direction) {
        const box = this.getBox(id);

        // update location
        box.x -= direction * Math.sin(box.radian) * BOX.vx;
        box.y += direction * Math.cos(box.radian) * BOX.vy;

        // if collide wall, keep the origin position
        box.x = Math.max(BOX.size / 2, Math.min(MAP.maxWidth - BOX.size / 2, box.x));
        box.y = Math.max(BOX.size / 2, Math.min(MAP.maxHeight - BOX.size / 2, box.y));

        // if collide other boxes, keep the origin location
        if (isCollidedWithBoxes(box.x, box.y, this.getLiveBoxes(box.id))) {
            box.x += direction * Math.sin(box.radian) * BOX.vx;
            box.y -= direction * Math.cos(box.radian) * BOX.vy;
        }
    }

    rotate(id, direction) {
        const box = this.getBox(id);
        box.radian += direction * BOX.vrot;
    }

    changeAttackType(id) {
        const box = this.getBox(id);
        box.attackType = Math.abs(box.attackType - 1);
    }

    removeBox(id) {
        delete this.boxes[id];
    }

    getBox(id) {
        return this.boxes[id];
    }

    getOtherBoxes(id) {
        return Object.values(this.boxes).filter(box => box.id !== id);
    }

    getBoxes() {
        return Object.values(this.boxes);
    }

    getLiveBoxes(exceptID = "") {
        return this.getBoxes().filter(box => !box.isDead && box.id !== exceptID);
    }

    getDeadBoxes(exceptID = "") {
        return this.getBoxes().filter(box => box.isDead && box.id !== exceptID);
    }

    checkReborn() {
        return this.getDeadBoxes().filter(box => Date.now() - box.deathTime >= BOX.bufReborn).map(box => {
            this.removeBox(box.id);
            return this.addBox(box.id, box.name, box.isFake);
        })
    }
}

module.exports = new BoxComponent();
