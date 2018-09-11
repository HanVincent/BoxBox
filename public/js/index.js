'use strict';
const SCALE = 2;
const MAP_WIDTH = 256 * SCALE;
const MAP_HEIGHT = 256 * SCALE;

let players = [];

// start
function startGame() {
  const name = document.getElementById("name").value.trim().substring(0, 10) || "";
  document.getElementById("start-modal").style.display = "none";

  setupSocket(name);
  startRender();
}