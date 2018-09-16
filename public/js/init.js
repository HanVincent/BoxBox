"use strict";
// should be 傳回來 by server
const SCALE = 2;
const MAP_WIDTH = 256;
const MAP_HEIGHT = 256;
const BOX = {
  size: 16
}


const FONT_STYLE = {
  fontFamily: "Courier New",
  fontSize: 12,
  fill: 0xdbd5d5,
  align: "left"
};

const app = new PIXI.Application({ width: MAP_WIDTH * SCALE, height: MAP_HEIGHT * SCALE });
const stage = app.stage;
const renderer = app.renderer;
const loader = PIXI.loader;

stage.scale.set(SCALE);
renderer.backgroundColor = 0x008800;

// BOARD
const BOARD_TEXT = new PIXI.Text("", FONT_STYLE);
BOARD_TEXT.visible = false;

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

stage.addChild(BOARD_TEXT, HELP_TEXT);