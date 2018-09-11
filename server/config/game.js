const MAP = {
    maxWidth: 256,
    maxHeight: 256,
    scale: 2,
};

// not used yet
const ENTITY = {
    size: 16
};

const BOX = {
    screenWidth: 600,
    screenHeight: 400,

    size: 16,

    maxBlood: 100,
    maxBullet: 2,

    vx: 10,
    vy: 10,
    vrot: 0.1,
}

const ATTACK = {
    KNIFE: 0,
    BULLET: 1,
    BOMB: 2,

    atkKnife: 50,
    atkBullet: 40,
    atkBomb: 60,

    bufKnife: 1,
    bufBullet: 1,
    bufChange: 1,
}


module.exports = { MAP, ENTITY, BOX, ATTACK }