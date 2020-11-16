class ScoreBoardComponent {

    constructor() {
        this.board = {}
    }

    get currentStatus() {
        return Object.values(this.board);
    }

    incrementDead(id) {
        this.board[id].dead += 1;
    }

    incrementKill(id) {
        this.board[id].kill += 1;
    }

    addBoxToBoard(box) {
        this.board[box.id] = {
            id: box.id,
            name: box.name,
            kill: 0,
            dead: 0,
        }
    }

    removeBoxFromBoard(id) {
        delete this.board[id]
    }

}

module.exports = new ScoreBoardComponent();