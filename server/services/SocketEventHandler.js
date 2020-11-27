const BoxComponent = require('./BoxComponent');
const AttackComponent = require('./AttackComponent');

const ScoreBoardComponent = require("./ScoreBoardComponent");

class SocketEventHandler {

    constructor() {
        // Create computer boxes
        const FAKE_NUM = 10;
        for (let comID = 0; comID < FAKE_NUM; comID++) {
            const box = BoxComponent.addBox(comID, "", true);
            ScoreBoardComponent.addBoxToBoard(box);
        }
    }

    connect(socketId, name) {
        console.debug("New user connected: " + socketId);

        const box = BoxComponent.addBox(socketId, name);
        ScoreBoardComponent.addBoxToBoard(box);
    }

    polling() {
        return {
            boxes: BoxComponent.getBoxes(),
            attacks: AttackComponent.getAttacks(),
            board: ScoreBoardComponent.currentStatus,
            deadAndReborn: {
                dead: BoxComponent.getDeadBoxes(),
                reborn: BoxComponent.checkReborn() // TODO: weird
            }
        }
    }

    keyPressed(socketId, pressed) {
        // TODO: refactor?
        if (BoxComponent.getBox(socketId).isDead) return;

        if (pressed.forward) BoxComponent.move(socketId, -1);
        if (pressed.backward) BoxComponent.move(socketId, 1);
        if (pressed.right) BoxComponent.rotate(socketId, 1);
        if (pressed.left) BoxComponent.rotate(socketId, -1);
        if (pressed.change) BoxComponent.changeAttackType(socketId);
        if (pressed.attack) AttackComponent.addAttack(BoxComponent.getBox(socketId));

        AttackComponent.checkAttacks(BoxComponent.getLiveBoxes());
    }

    disconnect(socketId) {
        console.debug('User disconnected: ' + socketId);

        BoxComponent.removeBox(socketId);
        AttackComponent.removeBullet(socketId);
        ScoreBoardComponent.removeBoxFromBoard(socketId);
    }

    clearAttacks() {
        AttackComponent.clearAttacks();
    }
}

module.exports = new SocketEventHandler();