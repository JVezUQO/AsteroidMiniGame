//Create a Pixi Application
const app = new PIXI.Application({width: 256, height: 256});
let coordx = 128
let coordy = 128
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
const sprite_test = PIXI.Sprite.from("assets/ressources/test.png")
app.stage.addChild(sprite_test);


app.ticker.add(delta => loop(delta));
function loop(delta) {
        
}


function moveUp(){
    sprite_test.y -= 1;
}

function moveDown(){
    sprite_test.y += 1;
}

function moveLeft(){
    sprite_test.x -= 1;
}

function moveRight(){
    sprite_test.x += 1;
}