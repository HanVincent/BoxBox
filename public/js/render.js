// TODO: game config ?
const mapWidth = 256;
const mapHeight = 256;

const stage = new PIXI.Container();
const renderer = PIXI.autoDetectRenderer(mapWidth, mapHeight);
const loader = PIXI.loader;

document.body.appendChild(renderer.view);

loader
  .add("ground", "images/ground.json")
  .add("character", "images/character.json")
  .load(setup);

renderer.backgroundColor = 0x008800;

let myBox,
  boxes = {},
  lawn,
  sea,
  character; // Sprite entity
function setup() {
  // render map?
  character = loader.resources.character.textures;
  myBox = new PIXI.Sprite(character["box"]);
  stage.addChild(myBox);

  gameLoop(); //Start the game loop
}

function renderMap() {}

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
    }
    boxes[player.id].x = player.x;
    boxes[player.id].y = player.y;
  }

  renderer.render(stage);
}
