const VALID_KEYS = ['w', 's', 'a', 'd', 'j', 'k', 'h', 'q'];// TODO: 要換成 keyCode
const pressed = new Set();

function isKeyValid(key) {
    return VALID_KEYS.includes(key);
}

function updateKeys(e) {
    const key = e.key;
    
    if (isKeyValid(key)) {
        e.type === 'keydown' ? pressed.add(key) : pressed.delete(e.key);
        socket.emit('keypress', [...pressed], () => { });
    }
}