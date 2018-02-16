'use strict';

const socket = io();

let me = {};
let others = [];
let board = [];

// connect
socket.on('connect', () => {
    console.log("Connected to server. EventListener is on");

    document.addEventListener('keydown', updateKeys);
    document.addEventListener('keyup', updateKeys);
});

socket.on('updateMe', (data) => {
    console.table(data);
    me = data;
});

socket.on('updateOthers', (data) => {
    console.log(data);
    others = data;
})

