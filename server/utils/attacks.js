const { ATTACK, BOX } = require("../config/game");
const { checkCollision, isBoxDead } = require("./utils");

class Attacks {
    constructor() {
        // this.attacks = [];
        this.knives = [];
        // this.bullets = [];
    }

    addAttack(box) {
        const radian = box.angle * (Math.PI / 180);

        const centX = box.x + BOX.size * 0.5;
        const centY = box.y + BOX.size * 0.5;
        const sin = Math.sin(radian);
        const cos = Math.cos(radian);

        switch (box.attackType) {
            case ATTACK.KNIFE:
                this.knives.push({
                    attacker: box.id,
                    x: centX + cos * BOX.size,
                    y: centY - sin * BOX.size,
                });
                break;

            // case ATTACK.BULLET:
            //     if (box.bulletNum === 0) break;

            //     this.bullets.push({
            //         attacker: box.id,
            //     });
            //     break;

            default:
                break;
        }
    }
    removeAttack(box) { }
    updateAttacks() {
        this.knives = [];
    }
    checkAttacks(boxes) {
        // TODO: refactor
        for (let knife of this.knives) {
            for (let box of boxes) {
                if (checkCollision(knife.x, knife.y, box.x + BOX.size / 2, box.y + BOX.size / 2)) {
                    box.blood -= ATTACK.atkKnife;
                    box.isDead = isBoxDead(box);
                }
            }
        }
    }
    getAttacks() {
        return this.knives;
    }
}

module.exports = { Attacks };
