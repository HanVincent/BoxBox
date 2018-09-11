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

    const box = {
      id, name, x, y, radian: 0,

      blood: BOX.maxBlood,
      bulletNum: BOX.maxBullet,
      attackType: isFake ? ATTACK.BOMB : ATTACK.KNIFE,

      isFake,
      isDead: false,
      isWaiting: false
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
    // room
    return Object.values(this.boxes);
    // const boxes = this.boxes.filter(box => box.room === room);
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
    if (isAnyCollided(box.x, box.y, this.getOtherBoxes(id))) {
      box.x += direction * Math.sin(box.radian) * BOX.vx;
      box.y -= direction * Math.cos(box.radian) * BOX.vy;
    }
  }

  rotate(id, direction) {
    const box = this.getBox(id);
    box.radian += direction * 0.1;//BOX.vrot; // only step 1

    // box.radian %= 360;
  }

  // check if any dead box and reborn
  checkAnyDead(callback) {
    const self = this;
    for (let box of this.getBoxes()) {
      if (box.isDead && !box.isWaiting) {

        // reborn
        this.removeBox(box.id);
        const pid = setTimeout(() => {
          self.addBox(box.id, box.name, box.isFake);
          callback(); // update game
        }, 5000);
        box.isWaiting = !!pid;
      }
    }
  }
}

module.exports = { Boxes };
