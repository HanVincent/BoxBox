class Model {
    constructor() {
        this.pressed = {forward: false, backward: false, right: false, left: false, change: false, attack: false};
        this.boxes = {}; // status
        this.view = new View();
    }

    updateKeys(e, callback) {
        const isPressed = e.type === "keydown";
        switch (e.keyCode) {
            case 81: // q
                if (!e.repeat) isPressed ? this.view.showBoardText() : this.view.hideBoardText();
                break;
            case 72: // h
                if (!e.repeat) isPressed ? this.view.showHelpText() : this.view.hideHelpText();
                break;
            case 87: // w
                this.pressed.forward = isPressed;
                break;
            case 83: // s
                this.pressed.backward = isPressed;
                break;
            case 65: // a
                this.pressed.left = isPressed;
                break;
            case 68: // d
                this.pressed.right = isPressed;
                break;
            case 75: // k
                this.pressed.attack = isPressed;
                break;
            case 74: // j
                this.pressed.change = isPressed;
                break;
        }

        callback(this.pressed);
    }

    updateStatus(socketId, boxes) {
        boxes.forEach(box => {
            (!this.boxes[box.id]) ? this.view.changeSprite(box, "box") : this.view.moveSprite(box);

            if (box.id === socketId) {
                box.attackType === 0? this.view.showKnifeAttackType() : this.view.showBulletAttackType();
                this.view.renderBloodText(box.blood);
            }
        });
    }

    updateAttack(attacks) {
        const {knives, bullets, bombs} = attacks;

        knives.forEach(knife => {
            this.view.showKnifeAttackAnima(knife.x, knife.y);
        });

        bullets.forEach(bullet => {
            bullet.isGone ? this.view.removeSprite(bullet.id) : this.view.changeSprite(bullet, "bullet");
        });

        bombs.forEach(bomb => {
            this.view.showBombAnima(bomb.x, bomb.y);
        });
    }

    updateBoard(board) {
        this.view.renderBoard(board);
    }

    updateDeadAndRebornBoxes({dead: deadBoxes = [], reborn: rebornBoxes = []}) {
        deadBoxes.forEach(box => {
            this.view.changeSprite(box, "blood");
        });

        rebornBoxes.forEach(box => {
            this.view.changeSprite(box, "box");
        });
    }

    removeBox(id) {
        this.view.removeSprite(id);
    }
}