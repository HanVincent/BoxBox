'use strict';

const socket = io();

let me = {};
let players = []; // except me
let board = [];

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
    for (let atk of attacks) {
        knifeAttack(atk.x, atk.y);
    }
})

socket.on('remove', (id) => {
    removeSprite(id);
})
