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

socket.on('update', (data) => {
    console.log(data);
    me = data.filter(el => el.id === socket.id)[0];
    players = data.filter(el => el.id !== socket.id);
})

