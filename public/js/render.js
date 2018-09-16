let lawn, sea, character; // Sprite entity
let sprites = { knife: null, bullet: null, blood: null };
let boxes = {};

function startRender(event) {
  event.preventDefault();
  
  document.body.appendChild(renderer.view);
  loader
    .add("ground", "images/ground.json")
    .add("character", "images/character.json")
    .load(setup);
}

function setup() {
  const value = document.getElementById("name").value;
  const name = value.trim().substring(0, 10) || "";
  document.getElementById("start-modal").style.display = "none";

  character = loader.resources.character.textures;

  setupSocket(name);

  setAbility();
  setBombAnima();
  setKnifeAnima();

  gameLoop(); // Start the game loop
}

function renderMap() { }

function gameLoop() {
  // Loop this function at 60 frames per second
  requestAnimationFrame(gameLoop);
  renderer.render(stage);
}

function setAbility() {
  sprites.knife = new PIXI.Sprite(character["knife_0"]);
  sprites.bullet = new PIXI.Sprite(character["bullet"]);
  sprites.blood = new PIXI.Text("100", FONT_STYLE);

  sprites.knife.x = BOX.size / 2;
  sprites.knife.y = BOX.size / 2
  sprites.knife.anchor.set(0.5);
  sprites.bullet.x = BOX.size / 2
  sprites.bullet.y = BOX.size / 2
  sprites.bullet.anchor.set(0.5);
  sprites.blood.x = BOX.size + 5;
  stage.addChild(sprites.knife, sprites.bullet, sprites.blood);
}

function updateAbility(player) {
  if (player.attackType === 0) {
    show(sprites.knife);
    hide(sprites.bullet);
  } else {
    show(sprites.bullet);
    hide(sprites.knife);
  }
  sprites.blood.text = player.blood;
}

function moveSprite(entity) {
  boxes[entity.id].x = entity.x;
  boxes[entity.id].y = entity.y;
  boxes[entity.id].rotation = entity.radian;
}

function changeSprite(entity, name) {
  removeSprite(entity.id);
  boxes[entity.id] = new PIXI.Sprite(character[name]);
  boxes[entity.id].anchor.set(0.5);
  moveSprite(entity);
  stage.addChild(boxes[entity.id]);
}

function removeSprite(id) {
  stage.removeChild(boxes[id]);
}

function show(obj) {
  obj.visible = true;
}
function hide(obj) {
  obj.visible = false;
}
