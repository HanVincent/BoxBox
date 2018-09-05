// TODO: game config ?
const mapWidth = 256;
const mapHeight = 256;

const app = new PIXI.Application({ width: mapWidth, height: mapHeight });
const stage = app.stage;
const renderer = app.renderer;
const loader = PIXI.loader;

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

function bomb(x, y) {
  bombing.x = x;
  bombing.y = y;
  bombing.gotoAndPlay(0);
  stage.addChild(bombing);
}

function knifeAttack(x, y) {
  knifing.x = x;
  knifing.y = y;
  knifing.gotoAndPlay(0);
  stage.addChild(knifing);
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