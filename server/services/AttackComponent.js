const ScoreBoardComponent = require("./ScoreBoardComponent");
const KnifeAttackModel = require("../models/KnifeAttackModel");
const BulletAttackModel = require("../models/BulletAttackModel");
const BombAttackModel = require("../models/BombAttackModel");

const {ATTACK} = require("../config/game");
const {isCollided, isBombed} = require("../lib/utils");

class AttackComponent {

    constructor() {
        this.knives = [];
        this.bombs = [];
        this.bullets = [];

        setInterval(this.updateBullets.bind(this), 60);
    }

    addAttack(box) {
        if (Date.now() - box.attackTime <= ATTACK.bufAttack) return;
        else box.attackTime = Date.now();

        switch (box.attackType) {
            case ATTACK.KNIFE:
                this.knives.push(new KnifeAttackModel(box));
                break;

            case ATTACK.BULLET:
                // TODO: decrease
                if (box.bulletNum <= 0) break;

                this.bullets.push(new BulletAttackModel(box));
                break;

            case ATTACK.BOMB:
                this.bombs.push(new BombAttackModel(box));
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

    clearAttacks() {
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
                    bullet.isGone = true;
                    this.attacked(bullet.attacker, box, ATTACK.atkBullet)
                }
            }
            if (box.isDead && box.isFake) { // bomb
                this.addAttack(box);
            }
        }

        this.checkBombs(boxes);
    }

    // TODO: refactor
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

    // TODO: refactor
    // only here will decrease blood
    attacked(attacker, attacked, hurt) {
        attacked.blood = Math.max(attacked.blood - hurt, 0);
        if (attacked.isDead = attacked.blood <= 0) {
            attacked.deathTime = Date.now();
            if (!attacked.isFake) {
                ScoreBoardComponent.incrementDead(attacked.id); // real box died
                if (attacker && !attacker.isFake)
                    ScoreBoardComponent.incrementKill(attacker.id); // kill right box
            }
        }
    }

    getAttacks() {
        return {
            knives: this.knives,
            bullets: this.bullets,
            bombs: this.bombs
        };
    }

}

module.exports = new AttackComponent();
