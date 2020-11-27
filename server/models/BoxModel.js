const {BOX, ATTACK} = require("../config/game");

class BoxModel {

    constructor(id, name, x, y, isFake = false) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.radian = 0; // TODO: random radian
        this.blood = BOX.maxBlood;
        this.bulletNum = BOX.maxBullet;
        this.attackType = !isFake ? ATTACK.KNIFE : ATTACK.BOMB;
        this.isFake = isFake;
        this.isDead = false;
        this.deathTime = 0; // 死亡時間
        this.attackTime = 0; // 攻擊冷卻時間
        this.weaponTime = 0; // 換武器冷卻時間
    }

}

module.exports = BoxModel;