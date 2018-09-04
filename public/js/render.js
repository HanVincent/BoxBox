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

let myBox, lawn, sea,
  boxes = {},
  character; // Sprite entity

function setup() {
  // render map?
  character = loader.resources.character.textures;

  myBox = new PIXI.Sprite(character["box"]);
  stage.addChild(myBox);

  setBombAnima();
  setKnifeAnima();

  knifeAttack(150, 150);
  
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

function gameLoop() {
  // Loop this function at 60 frames per second
  requestAnimationFrame(gameLoop);

  // position
  myBox.x = me.x;
  myBox.y = me.y;

  // update other boxes
  for (let player of players) {
    if (!boxes[player.id]) {
      boxes[player.id] = new PIXI.Sprite(character["box"]);
      stage.addChild(boxes[player.id]);
    } else if (player.isDead) {
      removeSprite(player.id);
      boxes[player.id] = new PIXI.Sprite(character["blood"]);
      stage.addChild(boxes[player.id]);
    }
    boxes[player.id].x = player.x;
    boxes[player.id].y = player.y;
  }

  renderer.render(stage);
}


function removeSprite(boxID) {
  stage.removeChild(boxes[boxID]);
}