// TODO: game config ?

const stage = new PIXI.Container();
const renderer = PIXI.autoDetectRenderer(1024, 1024);
const loader = PIXI.loader;

document.body.appendChild(renderer.view);

loader
    .add("ground", "images/ground.json")
    .add("character", "images/character.json")
    .load(setup);

let myBox, boxes, lawn, sea;
function setup() { // render map?
    const character = loader.resources.character.textures;
    myBox = new PIXI.Sprite(character["box"]);

    stage.addChild(myBox);


    gameLoop(); //Start the game loop
}

function renderMap(){

}

function gameLoop() {
    // Loop this function at 60 frames per second
    requestAnimationFrame(gameLoop);

    // position
    myBox.x = me.x;
    myBox.y = me.y;

    renderer.render(stage);
}


