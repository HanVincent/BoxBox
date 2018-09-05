'use strict';

const name = prompt("Please enter your name", "HanVincent").trim().substring(0, 10) || "";
const socket = io('', { query: `name=${name}` });

let players = [], board = [];

// connect
socket.on('connect', () => {
    console.log("Connected to server. EventListener is on");

    document.addEventListener('keydown', updateKeys);
    document.addEventListener('keyup', updateKeys);
});

socket.on('boxes', (data) => {
    players = data;
})

socket.on('attacks', (attacks) => {
    const [knives, bombs] = attacks;
    for (let knife of knives) {
        knifeAttack(knife.x, knife.y);
    }
    for (let bomb of bombs) {
        bombAttack(bomb.x, bomb.y);
    }
})

socket.on('board', (data) => {
    console.log(data);
    board = data;
})

socket.on('remove', (id) => {
    removeSprite(id);
})
