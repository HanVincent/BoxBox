const {BOX} = require("../config/game");

class AttackModel {
    constructor(attacker) {
        this.attacker = attacker;
        this.x = attacker.x + Math.sin(attacker.radian) * BOX.size; // start x
        this.y = attacker.y - Math.cos(attacker.radian) * BOX.size; // start y
    }
}

module.exports = AttackModel;