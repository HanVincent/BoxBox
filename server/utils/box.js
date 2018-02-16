const { map, box } = require('../config/game');

class Box {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.x = 0;
        this.y = 0;
        this.angle = 0;

        this.blood = box.maxBlood;
        this.bullet = box.maxBullet;

        // TODO: Refactor?
        this.kill = 0; 
        this.die = 0; 
    }

    move(direction) {
        const radian = this.angle * (Math.PI / 180);
        this.x -= direction * Math.sin(radian) * box.vx;
        this.y += direction * Math.cos(radian) * box.vy;
        this.checkLoc();
    }
    rotate(direction) {
        this.angle += direction * box.vrot; // only step 1
        this.angle %= 360;
    }
    checkLoc() { // can be merged
        this.x = Math.max(0, Math.min(map.maxWidth, this.x));
        this.y = Math.max(0, Math.min(map.maxHeight, this.y));
    }


}

module.exports = { Box };