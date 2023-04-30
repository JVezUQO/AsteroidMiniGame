//Create a Pixi Application
const app = new PIXI.Application({width: 256, height: 256});
let coordx = 128
let coordy = 128
let rotation = 0
let movX = 0
let movY = 0
const ticker = new PIXI.Ticker();
ticker.add(update)
ticker.start();
//Add the canvas that Pixi automatically created for you to the HTML document and create and append a test unit name sprite_test
document.body.appendChild(app.view);
const sprite_test = PIXI.Sprite.from("assets/ressources/test.png")
app.stage.addChild(sprite_test);
//



function update(delta) {
console.log(rotation, movX, movY)
sprite_test.x += movX 
sprite_test.y += movY
sprite_test.rotation += rotation
}


sprite_test.pivot.x = 16
sprite_test.pivot.y = 16

function moveUp(){
    movX += 1;
}

function moveDown(){
    movY += 1;
}

function moveLeft(){
    rotation -= 0.01;
//    rotation = sprite_test.rotation
}

function moveRight(){
    rotation += 0.01;
//    rotation = sprite_test.rotation
}
