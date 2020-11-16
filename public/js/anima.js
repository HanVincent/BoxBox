class Anima {
    constructor(stage) {
        this.stage = stage;
        this.bombing = [];
        this.knifing = [];

        // loading animation frames
        for (let i = 0; i < 4; i++) {
            this.bombing.push(new PIXI.Texture.fromFrame('bomb_' + i));
        }
        for (let i = 0; i < 8; i++) {
            this.knifing.push(PIXI.Texture.fromFrame('knife_' + i));
        }
    }

    bombAttack(x, y) {
        const surroundings = [[x - window.GAME.ENTITY.size, y - window.GAME.ENTITY.size], [x - window.GAME.ENTITY.size, y],
            [x - window.GAME.ENTITY.size, y + window.GAME.ENTITY.size], [x, y - window.GAME.ENTITY.size], [x, y + window.GAME.ENTITY.size],
            [x + window.GAME.ENTITY.size, y - window.GAME.ENTITY.size], [x + window.GAME.ENTITY.size, y], [x + window.GAME.ENTITY.size, y + window.GAME.ENTITY.size]];

        for (let [sx, sy] of surroundings) {
            const bomb = new PIXI.extras.AnimatedSprite(this.bombing);
            bomb.anchor.set(0.5);
            bomb.animationSpeed = 0.1;
            this.runAnimation(bomb, sx, sy);
        }
    }

    knifeAttack(x, y) {
        const knife = new PIXI.extras.AnimatedSprite(this.knifing);
        knife.anchor.set(0.5);
        knife.animationSpeed = 0.3;
        this.runAnimation(knife, x, y);
    }

    runAnimation(obj, x, y) {
        obj.loop = false;
        obj.onComplete = () => {
            this.stage.removeChild(obj);
        }
        obj.x = x;
        obj.y = y;
        obj.gotoAndPlay(0);
        this.stage.addChild(obj);
    }
}
