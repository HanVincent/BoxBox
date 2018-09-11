"use strict";
const SCALE = 2;
const MAP_WIDTH = 256 * SCALE;
const MAP_HEIGHT = 256 * SCALE;
const FONT_STYLE = {
  fontFamily: "Courier New",
  fontSize: 12,
  fill: 0xdbd5d5,
  align: "left"
};

const app = new PIXI.Application({ width: MAP_WIDTH, height: MAP_HEIGHT });
const stage = app.stage;
const renderer = app.renderer;
const loader = PIXI.loader;

stage.scale.set(SCALE);
renderer.backgroundColor = 0x008800;

// BOARD
const BOARD_TEXT = new PIXI.Text("", FONT_STYLE);
BOARD_TEXT.visible = false;
stage.addChild(BOARD_TEXT);

// HELP
const HELP_TEXT = new PIXI.Text(
  `
w: forward
s: backward
a: rotate left
d: rotate right

h: instruction
j: change attack type
k: attack
q: board
`,
  FONT_STYLE
);
HELP_TEXT.visible = false;
stage.addChild(HELP_TEXT);

// start
function startGame() {
  const value = document.getElementById("name").value;
  const name = value.trim().substring(0, 10) || "";
  document.getElementById("start-modal").style.display = "none";

  setupSocket(name);
  startRender();
}
