// TODO: game config ?
const SCALE = 2;
const mapWidth = 256 * SCALE;
const mapHeight = 256 * SCALE;

const app = new PIXI.Application({ width: mapWidth, height: mapHeight });
const stage = app.stage;
const renderer = app.renderer;
const loader = PIXI.loader;

stage.scale.set(SCALE);

document.body.appendChild(renderer.view);

loader
  .add("ground", "images/ground.json")
  .add("character", "images/character.json")
  .load(setup);

renderer.backgroundColor = 0x008800;

let lawn, sea, character; // Sprite entity
let boxes = {};

function setup() {
  // render map?
  character = loader.resources.character.textures;

  setBombAnima();
  setKnifeAnima();

  gameLoop(); // Start the game loop
}


function renderMap() { }

let tempDead = {};
function gameLoop() {
  // Loop this function at 60 frames per second
  requestAnimationFrame(gameLoop);

  for (let player of players) {
    if (!boxes[player.id]) {
      changeSprite(player, "box");
    } else if (player.isDead) {
      changeSprite(player, "blood");
    } else if (tempDead[player.id] !== player.isDead) {
      changeSprite(player, "box");
    }
    tempDead[player.id] = player.isDead;
    boxes[player.id].x = player.x;
    boxes[player.id].y = player.y;
  }

  renderer.render(stage);
}

function changeSprite(player, name) {
  removeSprite(player.id);
  boxes[player.id] = new PIXI.Sprite(character[name]);
  stage.addChild(boxes[player.id]);
}

function removeSprite(boxID) {
  stage.removeChild(boxes[boxID]);
}


const fontStyle = { fontFamily: 'Courier New', fontSize: 12, fill: 0xDBD5D5, align: 'left' }
let text = '';
function showBoard() {
  text = new PIXI.Text(formatBoard(), fontStyle);
  stage.addChild(text);
}

function hideBoard() {
  stage.removeChild(text);
}

let help = null;
function showHelp() {
  help = new PIXI.Text(`
  w: forward
  s: backward
  a: rotate left
  d: rotate right
  
  h: instruction
  j: change attack type
  k: attack
  q: board
  `, fontStyle);
  stage.addChild(help);
}

function hideHelp() {
  stage.removeChild(help);
}
