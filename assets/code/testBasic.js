// --- SETUP --- //

//Create a Pixi Application
let screenX = 764
let screenY = 512
const app = new PIXI.Application({width: screenX, height: screenY});

//Var for player
let coordx = screenX/2
let coordy = screenY/2
let rotation = 0
let movX = 0
let movY = 0

//Var for asteroids
let asteroidList = []

//Var for fire projectile
let fireList = []

//Var for ticker
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


// --- Main program --- //

function update(delta) {
//console.log(rotation, movX, movY, tickCount)
app.renderer.render(app.stage)
sprite_test.x += movX 
sprite_test.y += movY
sprite_test.rotation += rotation
sprite_test.tint = 0xFFFFFF
console.log(movY)

if(rotation > 0.15){rotation = 0.15}
if(rotation < -0.15){rotation = -0.15}
/* Not working like intended...
if(movX > 3){movX = 3}
if(movX < -3){movX = -3}

if(movY > 3){movY = 3}
if(movY < -3){movY = -3}
*/
OOB();
tickCount += 1;
if (tickCount >= 100 && asteroidList.length < 8){
    addAsteroid();

    tickCount = 0;
}

for(let i = 0; i<asteroidList.length ; i++){
    const selectAsteroid = asteroidList[i]
    selectAsteroid.x += selectAsteroid.speed*Math.sin(selectAsteroid.direction)
    selectAsteroid.y += selectAsteroid.speed*Math.cos(selectAsteroid.direction)
    selectAsteroid.rotation += 0.01 + selectAsteroid.spin

    if(selectAsteroid.x >= screenX+1){
        selectAsteroid.x = 0        
    }
    if(selectAsteroid.y >= screenY+1){
        selectAsteroid.y = 0        
    }
    if(selectAsteroid.x <= -1){
        selectAsteroid.x = screenX        
    }
    if(selectAsteroid.y <= -1){
        selectAsteroid.y = screenY       
    }

}

for(let z = 0;z<fireList.length; z++){
    const selectBeam = fireList[z]
    selectBeam.x += selectBeam.speed*Math.sin(selectBeam.direction)
    selectBeam.y += selectBeam.speed*Math.cos(selectBeam.direction)
}

//console.log(asteroidList)
for(let i = 0; i<asteroidList.length ; i++){
    const selectAsteroid = asteroidList[i]
    const astX = selectAsteroid.x 
    const asty = selectAsteroid.y

    if(Math.abs (selectAsteroid.x - sprite_test.x )<= 24 && Math.abs (selectAsteroid.y - sprite_test.y )<= 24 ){
        console.log(" --- COLLISSION --- ")
        sprite_test.tint = 0xFF0000  // RGB --> R--
    }


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
}

function moveRight(){
    rotation += 0.005;
}

function OOB(){ //Out of Bound
    if(sprite_test.position.x >= screenX+1){
        sprite_test.position.x = 0        
    }
    if(sprite_test.position.y >= screenY+1){
        sprite_test.position.y = 0        
    }
    if(sprite_test.position.x <= -1){
        sprite_test.position.x = screenX        
    }
    if(sprite_test.position.y <= -1){
        sprite_test.position.y = screenY       
    }
}


function collisionCheck(){}

function fireBeam(){
    const pew = PIXI.Sprite.from("assets/ressources/beam.png")
    pew.anchor.set(0.5)
    pew.x = sprite_test.x
    pew.y = sprite_test.y
    pew.rotation = sprite_test.rotation
    pew.speed = 0.05
    fireList.push(pew)
    app.stage.addChild(pew)
}

function addAsteroid(){
    const rock = PIXI.Sprite.from("assets/ressources/ast.png")
    rock.anchor.set(0.5)
    rock.x = Math.random() * screenX
    rock.y = Math.random() * screenY
    rock.direction = Math.random() * Math.PI * 2
    rock.spin = (Math.random()-0.5)/10
    rock.speed = 0.5
    asteroidList.push(rock)
    app.stage.addChild(rock)
}

