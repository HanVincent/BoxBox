const AttackModel = require("./AttackModel");

class BulletAttackModel extends AttackModel {

    static bulletNumber = 0;

    constructor(box) {
        super(box);

        this.id = "bullet_" + BulletAttackModel.bulletNumber++;
        this.radian = box.radian;
        this.dx= Math.sin(box.radian) * 10;
        this.dy = Math.cos(box.radian) * 10;
        this.updateTime = 0;
    }

}

module.exports = BulletAttackModel;