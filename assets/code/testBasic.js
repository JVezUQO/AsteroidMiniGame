//Create a Pixi Application

const app = new PIXI.Application({width: 512, height: 512});
let coordx = 128
let coordy = 128
let rotation = 0
let movX = 0
let movY = 0
let tickCount = 0
const ticker = new PIXI.Ticker();
ticker.add(update)
ticker.start();
//Add the canvas that Pixi automatically created for you to the HTML document and create and append a test unit name sprite_test
document.body.appendChild(app.view);
const sprite_test = PIXI.Sprite.from("assets/ressources/player.png")
app.stage.addChild(sprite_test);
sprite_test.position.x = coordx
sprite_test.position.y = coordy

// Main program

function update(delta) {
console.log(rotation, movX, movY, tickCount)
sprite_test.x += movX 
sprite_test.y += movY
sprite_test.rotation += rotation

OOB() ; //SL();
tickCount += 1;
if (tickCount >= 500){
    summonAsteroid();
    tickCount = 0;
}
}


sprite_test.pivot.x = 16
sprite_test.pivot.y = 16

function moveUp(){
    movY -= Math.cos(sprite_test.rotation);
    movX += Math.sin(sprite_test.rotation);
}

function moveDown(){
    movY += Math.cos(sprite_test.rotation);
    movX -= Math.sin(sprite_test.rotation);
}

function moveLeft(){
    rotation -= 0.005;
//    rotation = sprite_test.rotation
}

function moveRight(){
    rotation += 0.005;
//    rotation = sprite_test.rotation
}

function OOB(){ //Out of Bound
    if(sprite_test.position.x >= 513){
        sprite_test.position.x = 0        
    }
    if(sprite_test.position.y >= 512){
        sprite_test.position.y = 0        
    }
    if(sprite_test.position.x <= -1){
        sprite_test.position.x = 512        
    }
    if(sprite_test.position.y <= -1){
        sprite_test.position.y = 512       
    }
}

function SL(){ // Speed Limiter ...not wokring
    if (movX >= 3){
            movX = 3
    }
    if (movX <= -3){
        movX = -3
    }

    if (movY >= 3){
        movY = 3
    }
    if (movY <= -3){
        movY= -3
    }
}

function summonAsteroid(){ //Summon a basic test asteroid
    const rock = PIXI.Sprite.from("assets/ressources/test.png")
    rock.pivot.x =16;
    rock.pivot.y =16;
    rock.position.x = Math.random()*511+1
    rock.position.y = Math.random()*511+1
    rock.rotation = Math.random()-0.5
    app.stage.addChild(rock)
}

function moveAsteroid(){}

function collisionCheck(){}

function fireBeam(){}