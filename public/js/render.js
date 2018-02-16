const stage = new PIXI.Container();
const renderer = PIXI.autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

const loader = PIXI.loader;

loader
    .add("ground", "images/ground.json")
    .add("character", "images/character.json")
    .load(setup);

let character, box;

function setup() {
    character = loader.resources.character.textures;
    box = new PIXI.Sprite(character["box"]);

    // position
    box.x = 32;
    box.y = 32;
    stage.addChild(box);

    //render the stage
    renderer.render(stage);
    gameLoop(); //Start the game loop
}

function gameLoop() {
    //Loop this function at 60 frames per second
    requestAnimationFrame(gameLoop);

    //Move the cat 1 pixel to the right each frame
    box.x = me.x;
    box.y = me.y;

    //Render the stage to see the animation
    renderer.render(stage);
}

  
