const MAP = {
    maxWidth: 1024,
    maxHeight: 1024,
};

const BOX = {
    screenWidth: 600,
    screenHeight: 400,

    size: 16,

    maxBlood: 100,
    maxBullet: 2,

    vx: 10,
    vy: 10,
    vrot: 10,
}

const ATTACK = {
    knife: -50,
    bullet: -40,

    bufKnife: 1,
    bufBullet: 1,
    bufChange: 1,
}


module.exports = { MAP, BOX, ATTACK }