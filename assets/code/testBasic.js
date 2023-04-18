//Create a Pixi Application
const app = new PIXI.Application({width: 256, height: 256});
let coordx = 0
let coordy = 0
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

function addDummy(){
let sprite_test = PIXI.Sprite.from("assets/ressources/test.png")
app.stage.addChild(sprite_test);
sprite_test.x = coordx
sprite_test.y = coordy  
}

function moveUp(){
    coordy--
}

function moveDown(){
    coordy++
}

function moveLeft(){
    coordx--
}

function moveRight(){
    coordx++
}