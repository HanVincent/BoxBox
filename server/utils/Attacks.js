const { ATTACK, BOX } = require("../config/game");
const { isCollided, isBombed } = require("./utils");

class Attacks {
    constructor() {
        this.knives = [];
        this.bombs = [];
        this.bullets = [];
        this.board = {}; // don't know why use {}
        this.bulletID = 0;
    }

    addBoxToBoard(box) {
        this.board[box.id] = {
            id: box.id,
            name: box.name,
            kill: 0,
            dead: 0,
        }
    }
    removeBoxFromBoard(id) {
        delete this.board[id]
    }
    addAttack(box) {
        if (Date.now() - box.attackTime <= ATTACK.bufAttack) return;
        else box.attackTime = Date.now();

        const radian = box.radian;
        const sin = Math.sin(radian);
        const cos = Math.cos(radian);
        const x = box.x + sin * BOX.size; // start x
        const y = box.y - cos * BOX.size; // start y

        switch (box.attackType) {
            case ATTACK.KNIFE:
                this.knives.push({ attacker: box, x, y });
                break;

            case ATTACK.BULLET:
                if (box.bulletNum <= 0) break;

                this.bullets.push({
                    attacker: box,
                    id: "bullet_" + this.bulletID,
                    x, y, radian,
                    dx: sin * 10, dy: cos * 10, updateTime: 0
                });
                this.bulletID++;
                break;

            case ATTACK.BOMB:
                this.bombs.push({ x: box.x, y: box.y });
                break;

            default:
                break;
        }
    }
    updateBullets() {
        this.bullets.forEach(bullet => {
            bullet.x += bullet.dx;
            bullet.y -= bullet.dy;
            bullet.updateTime += 1;
            bullet.isGone = bullet.updateTime > 20;
        });
        // TODO: workaround
        this.bullets = this.bullets.filter(bullet => bullet.updateTime < 30);
    }
    removeBullet(id) {
        this.bullets = this.bullets.filter(bullet => bullet.attacker.id !== id);
    }
    updateAttacks() {
        this.knives = [];
        this.bombs = [];
    }
    checkAttacks(boxes) {
        // TODO: refactor
        for (let box of boxes) {
            for (let knife of this.knives) {
                if (box.id !== knife.attacker.id &&
                    isCollided(knife.x, knife.y, box.x, box.y)) {
                    this.attacked(knife.attacker, box, ATTACK.atkKnife)
                }
            }
            for (let bullet of this.bullets) {
                if (!bullet.isGone &&
                    box.id !== bullet.attacker.id &&
                    isCollided(bullet.x, bullet.y, box.x, box.y)) {
                    bullet.updateTime = 20; // TODO: fix
                    this.attacked(bullet.attacker, box, ATTACK.atkBullet)
                }
            }
            if (box.isDead && box.isFake) { // bomb
                this.addAttack(box);
            }
        }

        this.checkBombs(boxes);
    }
    checkBombs(boxes) {
        for (let bomb of this.bombs) {
            for (let box of boxes) {
                if (isBombed(bomb.x, bomb.y, box.x, box.y)) {
                    this.attacked(null, box, ATTACK.atkBomb);
                    if (box.isDead && box.isFake) { // bomb
                        this.addAttack(box);
                    }
                }
            }
        }
    }
    // only here will decrease blood
    attacked(attacker, attacked, hurt) {
        attacked.blood = Math.max(attacked.blood - hurt, 0);
        if (attacked.isDead = attacked.blood <= 0) {
            attacked.deathTime = Date.now();
            if (!attacked.isFake) {
                this.board[attacked.id].dead += 1; // real box died
                if (attacker && !attacker.isFake)
                    this.board[attacker.id].kill += 1; // kill right box
            }
        }
    }
    getAttacks() {
        return [this.knives, this.bullets, this.bombs];
    }
    getBoard() {
        return Object.values(this.board);
    }
}

module.exports = { Attacks };
