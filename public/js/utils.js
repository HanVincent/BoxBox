const VALID_KEYS = ['w', 's', 'a', 'd', 'j', 'k', 'h', 'q'];// TODO: 要換成 keyCode
const pressed = new Set();

function isKeyValid(key) {
    return VALID_KEYS.includes(key);
}

function updateKeys(e) {
    if (isKeyValid(e.key)) {
        // TODO: refactor shit code
        if (e.key === 'q') {
            if (!e.repeat)
                e.type === 'keydown' ? showBoard() : hideBoard();
        } else if (e.key === 'h') {
            if (!e.repeat)
                e.type === 'keydown' ? showHelp() : hideHelp();
        } else {
            if (e.type === 'keyup') {
                pressed.delete(e.key);
            } else {
                pressed.add(e.key);
                socket.emit('keypress', [...pressed], () => { });
            }
        }
    }
}

function padding(txt, length = 10) {
    return (Array(length).join(' ') + txt).slice(-length);
}

function formatBoard() {
    return board.reduce((acc, player) => {
        return acc + padding(player.name) + padding(player.kill) + padding(player.dead) + "\n"
    }, padding('Name') + padding('Kill') + padding('Dead') + "\n");
}