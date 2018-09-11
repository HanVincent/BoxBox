'use strict';

let players = [], board = [];

// start
function startGame() {
  const name = document.getElementById("name").value.trim().substring(0, 10) || "";
  document.getElementById("start-modal").style.display = "none";

  setupSocket(name);
  startRender();
}