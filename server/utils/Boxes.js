const { MAP, BOX, ATTACK } = require("../config/game");
const { genLoc, isAnyCollided } = require("./utils");

class Boxes {
  constructor(id) {
    this.boxes = {};
  }

  addBox(id, name = "", isFake = false) {
    let [x, y] = genLoc();
    while (isAnyCollided(x, y, this.getBoxes())) {
      [x, y] = genLoc();
    }
    // TODO: random radian
    const box = {
      id, name, x, y, radian: 0,

      blood: BOX.maxBlood,
      bulletNum: BOX.maxBullet,
      attackType: isFake ? ATTACK.BOMB : ATTACK.KNIFE,

      isFake,
      isDead: false,
      deathTime: 0,
      attackTime: 0,
      weaponTime: 0,
    }
    this.boxes[id] = box;
    return box;
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

  move(id, direction) {
    const box = this.getBox(id);

    // update location
    box.x -= direction * Math.sin(box.radian) * BOX.vx;
    box.y += direction * Math.cos(box.radian) * BOX.vy;

    // if collide wall
    box.x = Math.max(BOX.size / 2, Math.min(MAP.maxWidth - BOX.size / 2, box.x));
    box.y = Math.max(BOX.size / 2, Math.min(MAP.maxHeight - BOX.size / 2, box.y));

    // if collide others, restore origin location
    if (isAnyCollided(box.x, box.y, this.getLiveBoxes(id))) {
      box.x += direction * Math.sin(box.radian) * BOX.vx;
      box.y -= direction * Math.cos(box.radian) * BOX.vy;
    }
  }

  rotate(id, direction) {
    const box = this.getBox(id);
    box.radian += direction * BOX.vrot; // only step 1
  }

  change(id) {
    const box = this.getBox(id);
    box.attackType = Math.abs(box.attackType - 1);
  }
}

module.exports = { Boxes };
