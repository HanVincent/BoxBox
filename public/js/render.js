let lawn, sea, character; // Sprite entity
let players = [];
let boxes = {},
  bloods = {};

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
    // TODO: refactor
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
  if (boxes[player.id]) {
    // if has sprite
  }
  removeSprite(player.id);
  boxes[player.id] = new PIXI.Sprite(character[name]);
  boxes[player.id].anchor.set(0.5);
  stage.addChild(boxes[player.id]);
}

function removeSprite(boxID) {
  stage.removeChild(boxes[boxID]);
}

function show(obj) {
  obj.visible = true;
}
function hide(obj) {
  obj.visible = false;
}
