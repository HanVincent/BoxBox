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
    size: 16,

    maxBlood: 100,
    maxBullet: 2,

    vx: 10,
    vy: 10,
    vrot: 0.1,
    
    bufReborn: 5000,
    bufWeapon: 1000,
}

const ATTACK = {
    KNIFE: 0,
    BULLET: 1,
    BOMB: 2,

    atkKnife: 50,
    atkBullet: 40,
    atkBomb: 60,

    bufAttack: 1000,
}


module.exports = { MAP, ENTITY, BOX, ATTACK }