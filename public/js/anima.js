let bombing = [], knifing = [];

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

function bombAttack(x, y) {
    const bomb = new PIXI.extras.AnimatedSprite(bombing);
    bomb.anchor.set(0.5);
    bomb.animationSpeed = 0.1;
    bomb.loop = false;
    bomb.onComplete = () => {
        stage.removeChild(bomb);
    }

    bomb.x = x;
    bomb.y = y;
    bomb.gotoAndPlay(0);
    stage.addChild(bomb);
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