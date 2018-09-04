const { MAP, BOX, ATTACK } = require("../config/game");
const { genLoc, isAnyCollided } = require("./utils");

class Boxes {
  constructor(id) {
    this.boxes = [];
  }

  addBox(id, name = "") {
    let [x, y] = genLoc();
    while (isAnyCollided(x, y, this.boxes)) {
      [x, y] = genLoc();
    }

    this.boxes.push({
      id,
      name,
      x,
      y,
      angle: 90,

      blood: BOX.maxBlood,
      bulletNum: BOX.maxBullet,
      attackType: ATTACK.KNIFE,

      // TODO: Refactor? 獨立成一個 class
      kill: 0,
      die: 0,
      isDead: false
    });
    // return box?
  }
  removeBox(id) {
    this.boxes = this.boxes.filter(box => box.id !== id);
    // return box?
  }
  getBox(id) {
    return this.boxes.find(box => box.id === id);
  }
  getOtherBoxes(id) {
    return this.boxes.filter(box => box.id !== id);
  }
  getBoxes() {
    // room
    return this.boxes;
    // const boxes = this.boxes.filter(box => box.room === room);
  }

  getBoard() {
    return this.boxes.map(box => {
      return {
        name: box.name,
        kill: box.kill,
        die: box.die
      };
    });
  }

  move(id, direction) {
    const box = this.getBox(id);
    if (box.isDead) return;


    const radian = box.angle * (Math.PI / 180);

    // update location
    box.x -= direction * Math.cos(radian) * BOX.vx;
    box.y += direction * Math.sin(radian) * BOX.vy;

    // if collide wall
    box.x = Math.max(0, Math.min(MAP.maxWidth - BOX.size, box.x));
    box.y = Math.max(0, Math.min(MAP.maxHeight - BOX.size, box.y));

    // if collide others, restore origin location
    if (isAnyCollided(box.x, box.y, this.getOtherBoxes(id))) {
      box.x += direction * Math.cos(radian) * BOX.vx;
      box.y -= direction * Math.sin(radian) * BOX.vy;
    }
  }

  rotate(id, direction) {
    const box = this.getBox(id);
    box.angle += direction * BOX.vrot; // only step 1
    box.angle %= 360;
  }
}

module.exports = { Boxes };
