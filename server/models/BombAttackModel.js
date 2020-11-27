const AttackModel = require("./AttackModel");

class BombAttackModel extends AttackModel {

    constructor(box) {
        super(box);
        this.x = box.x;
        this.y = box.y;
    }

}

module.exports = BombAttackModel;