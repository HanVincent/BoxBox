const FONT_STYLE = {
    fontFamily: "Courier New",
    fontSize: 12,
    fill: 0xdbd5d5,
    align: "left"
};

const instruction = `
w: forward
s: backward
a: rotate left
d: rotate right

h: instruction
j: change attack type
k: attack
q: board
`

class View {

    constructor() {
        this.app = new PIXI.Application({
            width: window.GAME.MAP.maxWidth * window.GAME.MAP.scale,
            height: window.GAME.MAP.maxHeight * window.GAME.MAP.scale
        });
        this.stage = this.app.stage;
        this.renderer = this.app.renderer;
        this.loader = PIXI.loader;
        this.boardText = new PIXI.Text("", FONT_STYLE);
        this.helpText = new PIXI.Text(instruction, FONT_STYLE);

        // Sprite entity
        this.characterTextures = null;
        this.boxes = {};
        this.knife = null;
        this.bullet = null;
        this.bloodText = null;
        this.lawn = null;
        this.sea = null;

        this.init();
    }

    init() {
        this.stage.scale.set(window.GAME.MAP.scale);
        this.stage.addChild(this.boardText, this.helpText);
        this.renderer.backgroundColor = 0x008800;
        this.helpText.visible = false;
        this.boardText.visible = false;

        document.body.appendChild(this.renderer.view);

        this.loader
            .add("ground", "images/ground.json")
            .add("character", "images/character.json")
            .load(() => {
                // get image textures
                this.characterTextures = this.loader.resources.character.textures;

                // setup attack object
                this.knife = new PIXI.Sprite(this.characterTextures["knife_0"]);
                this.knife.x = window.GAME.ENTITY.size / 2;
                this.knife.y = window.GAME.ENTITY.size / 2
                this.knife.anchor.set(0.5);

                this.bullet = new PIXI.Sprite(this.characterTextures["bullet"]);
                this.bullet.x = window.GAME.ENTITY.size / 2
                this.bullet.y = window.GAME.ENTITY.size / 2
                this.bullet.anchor.set(0.5);

                this.bloodText = new PIXI.Text("100", FONT_STYLE);
                this.bloodText.x = window.GAME.ENTITY.size + 5;

                this.stage.addChild(this.knife, this.bullet, this.bloodText);

                // Anima component
                this.anima = new Anima(this.stage);
            });
    }

    moveSprite(box) {
        this.boxes[box.id].x = box.x;
        this.boxes[box.id].y = box.y;
        this.boxes[box.id].rotation = box.radian;
    }

    changeSprite(box, spriteName) {
        this.removeSprite(box.id);
        this.boxes[box.id] = new PIXI.Sprite(this.characterTextures[spriteName]);
        this.boxes[box.id].anchor.set(0.5);
        this.moveSprite(box);
        this.stage.addChild(this.boxes[box.id]);
    }

    removeSprite(id) {
        this.stage.removeChild(this.boxes[id]);
    }

    showKnifeAttackType() {
        this.show(this.knife);
        this.hide(this.bullet);
    }

    showBulletAttackType() {
        this.show(this.bullet);
        this.hide(this.knife);
    }

    showBoardText() {
        this.show(this.boardText);
    }

    hideBoardText() {
        this.hide(this.boardText);
    }

    showHelpText() {
        this.show(this.helpText);
    }

    hideHelpText() {
        this.hide(this.helpText);
    }

    showKnifeAttackAnima(x, y) {
        this.anima.knifeAttack(x, y);
    }

    showBombAnima(x, y) {
        this.anima.bombAttack(x, y);
    }

    renderBloodText(blood) {
        this.bloodText.text = blood;
    }

    renderBoard(board) {
        this.boardText.text = this.formatBoard(board);
    }

    show(obj) {
        obj.visible = true;
    }

    hide(obj) {
        obj.visible = false;
    }

    formatBoard(board) {
        return board.reduce((acc, player) => {
            return (
                acc +
                this.padding(player.name) +
                this.padding(player.kill) +
                this.padding(player.dead) +
                "\n"
            );
        }, this.padding("Name") + this.padding("Kill") + this.padding("Dead") + "\n");
    }

    padding(txt, length = 10) {
        return (Array(length).join(" ") + txt).slice(-length);
    }

}
