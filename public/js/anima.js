let bombing, knifing;

function setBombAnima() {
    const frames = [];
    for (let i = 0; i < 4; i++) {
        frames.push(PIXI.Texture.fromFrame('bomb_' + i));
    }
    bombing = new PIXI.extras.AnimatedSprite(frames);
    bombing.anchor.set(0.5);
    bombing.animationSpeed = 0.1;
    bombing.loop = false;
    bombing.onComplete = () => {
        stage.removeChild(bombing);
    }
}

function setKnifeAnima() {
    const frames = [];
    for (let i = 0; i < 8; i++) {
        frames.push(PIXI.Texture.fromFrame('knife_' + i));
    }
    knifing = new PIXI.extras.AnimatedSprite(frames);
    knifing.anchor.set(0.5);
    knifing.animationSpeed = 0.3;
    knifing.loop = false;
    knifing.onComplete = () => {
        stage.removeChild(knifing);
    }
}