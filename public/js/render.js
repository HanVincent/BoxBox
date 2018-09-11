// TODO: game config ?
const app = new PIXI.Application({ width: MAP_WIDTH, height: MAP_HEIGHT });
const stage = app.stage;
const renderer = app.renderer;
const loader = PIXI.loader;

stage.scale.set(SCALE);
renderer.backgroundColor = 0x008800;

let lawn, sea, character; // Sprite entity
let boxes = {}, bloods = {};

function startRender() {
  document.body.appendChild(renderer.view);
  loader
    .add("ground", "images/ground.json")
    .add("character", "images/character.json")
    .load(setup);
}

function setup() {
  character = loader.resources.character.textures;

  setBombAnima();
  setKnifeAnima();

  gameLoop(); // Start the game loop
}

function renderMap() {}

let tempDead = {};
function gameLoop() {
  // Loop this function at 60 frames per second
  requestAnimationFrame(gameLoop);

  for (let player of players) {
    if (!boxes[player.id]) {
      updateSprite(player, "box");
    } else if (player.isDead) {
      updateSprite(player, "blood");
    } else if (tempDead[player.id] !== player.isDead) {
      updateSprite(player, "box");
    }
    tempDead[player.id] = player.isDead;
    boxes[player.id].x = player.x;
    boxes[player.id].y = player.y;
    boxes[player.id].rotation = player.radian;
  }

  renderer.render(stage);
}

function updateSprite(player, name) {
  if(boxes[player.id]) { // if has sprite

  }
  removeSprite(player.id);
  boxes[player.id] = new PIXI.Sprite(character[name]);
  boxes[player.id].anchor.set(0.5);
  stage.addChild(boxes[player.id]);
}

function removeSprite(boxID) {
  stage.removeChild(boxes[boxID]);
}

// FONT
const fontStyle = {
  fontFamily: "Courier New",
  fontSize: 12,
  fill: 0xdbd5d5,
  align: "left"
};

// BOARD
const BOARD_TEXT = new PIXI.Text("", fontStyle);
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
  fontStyle
);
HELP_TEXT.visible = false;
stage.addChild(HELP_TEXT);
