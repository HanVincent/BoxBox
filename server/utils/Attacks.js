const { ATTACK, BOX } = require("../config/game");
const { isCollided, isBombed } = require("./utils");

class Attacks {
    constructor() {
        // this.attacks = [];
        this.knives = [];
        this.bombs = [];
        // this.bullets = [];
        this.board = {}; // don't know why use {}
    }

    updateBoard(box) {
        this.board[box.id] = {
            id: box.id,
            name: box.name,
            kill: 0,
            dead: 0,
        }
    }
    removeBoard(id) {
        delete this.board[id]
    }
    addAttack(box) {
        const radian = box.angle * (Math.PI / 180);

        const sin = Math.sin(radian);
        const cos = Math.cos(radian);

        switch (box.attackType) {
            case ATTACK.KNIFE:
                this.knives.push({
                    attacker: box,
                    x: box.x + cos * BOX.size,
                    y: box.y - sin * BOX.size,
                });
                break;

            // case ATTACK.BULLET:
            //     if (box.bulletNum === 0) break;

            //     this.bullets.push({
            //         attacker: box,
            //     });
            //     break;

            case ATTACK.BOMB:
                // surrounding
                this.bombs.push({ x: box.x - BOX.size, y: box.y - BOX.size });
                this.bombs.push({ x: box.x - BOX.size, y: box.y, });
                this.bombs.push({ x: box.x - BOX.size, y: box.y + BOX.size });
                this.bombs.push({ x: box.x, y: box.y + BOX.size });
                this.bombs.push({ x: box.x, y: box.y + BOX.size });
                this.bombs.push({ x: box.x + BOX.size, y: box.y - BOX.size });
                this.bombs.push({ x: box.x + BOX.size, y: box.y });
                this.bombs.push({ x: box.x + BOX.size, y: box.y + BOX.size });
                break;

            default:
                break;
        }
    }
    updateAttacks() {
        this.knives = [];
        this.bombs = [];
    }
    checkAttacks(boxes) {
        // TODO: refactor
        for (let knife of this.knives) {
            for (let box of boxes) {
                if (!box.isDead &&
                    box.id !== knife.attacker.id &&
                    isCollided(knife.x, knife.y, box.x, box.y)) {

                    this.attacked(knife.attacker, box, ATTACK.atkKnife)

                    if (box.isDead && box.isFake) { // bomb
                        this.addAttack(box);
                        this.checkAnyInBombRange(box, boxes);
                    } else {
                        // 才回傳死掉的 emit
                    }
                }
            }
        }
    }
    checkAnyInBombRange(bombingBox, boxes) {
        for (let box of boxes) {
            if (bombingBox.id !== box.id && isBombed(bombingBox.x, bombingBox.y, box.x, box.y)) {
                // TODO: fake can attack fake?
                this.attacked(bombingBox, box, ATTACK.atkBomb);
            }
        }
    }
    // only here will decrease blood
    attacked(attacker, attackee, hurt) {
        attackee.blood -= hurt;
        attackee.isDead = attackee.blood <= 0;
        if (attackee.isDead && !attackee.isFake) {
            if (!attacker.isFake)
                this.board[attacker.id].kill += 1;
            this.board[attackee.id].dead += 1;
        }
    }
    getAttacks() {
        return [this.knives, this.bombs];
    }
    getBoard() {
        return Object.values(this.board);
    }
}

module.exports = { Attacks };
