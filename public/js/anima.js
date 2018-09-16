let bombing = [], knifing = [];

// init
function setBombAnima() {
    for (let i = 0; i < 4; i++) {
        bombing.push(PIXI.Texture.fromFrame('bomb_' + i));
    }
}

function setKnifeAnima() {
    for (let i = 0; i < 8; i++) {
        knifing.push(PIXI.Texture.fromFrame('knife_' + i));
    }
}

// utils
function bombAttack(x, y) {
    const surroundings = [[x - BOX.size, y - BOX.size], [x - BOX.size, y],
    [x - BOX.size, y + BOX.size], [x, y - BOX.size], [x, y + BOX.size],
    [x + BOX.size, y - BOX.size], [x + BOX.size, y], [x + BOX.size, y + BOX.size]];

    for (let [sx, sy] of surroundings) {
        const bomb = new PIXI.extras.AnimatedSprite(bombing);
        bomb.anchor.set(0.5);
        bomb.animationSpeed = 0.1;
        bomb.loop = false;
        bomb.onComplete = () => {
            stage.removeChild(bomb);
        }
        bomb.x = sx;
        bomb.y = sy;
        bomb.gotoAndPlay(0);
        stage.addChild(bomb);
    }
}

function knifeAttack(x, y) {
    const knife = new PIXI.extras.AnimatedSprite(knifing);
    knife.anchor.set(0.5);
    knife.animationSpeed = 0.3;
    knife.loop = false;
    knife.onComplete = () => {
        stage.removeChild(knife);
    }
    knife.x = x;
    knife.y = y;
    knife.gotoAndPlay(0);
    stage.addChild(knife);
}