//  Jean Vezina @2023
//
// --- SETUP --- //

//Create a Pixi Application
let screenX = 764
let screenY = 512
let border = 64
const app = new PIXI.Application({width: screenX, height: screenY+border});

//Var for player
let coordx = screenX/2
let coordy = screenY/2
let rotation = 0
let movX = 0
let movY = 0
let score = 0
let lives = 3
let cooldownDelay = 0
let cooldownMax = 10
//Var for line
let linePoY = screenY+1
let line = new PIXI.Graphics()

//Var for score   //need to add updater
let scoreWrite = new PIXI.Text("", { 
    fill: "#FFFFFF",
    fontSize: 24,
    fontFamily : "Pixel",
    antiAlias : false
}
)
//LocalStorage get Highscore

var bestScore = localStorage.getItem("BestScore")

if (bestScore == null){bestScore = 0; localStorage.setItem("BestScore", 0)}



//Var for asteroids
let asteroidList = []
let speedMulti = 1

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
app.stage.addChild(sprite_test)
app.stage.addChild(line)
sprite_test.position.x = coordx
sprite_test.position.y = coordy
line.lineStyle(2, 0xFFFFFF, 1)
line.moveTo(1,linePoY)
line.lineTo(screenX,linePoY)
line.endFill();
app.stage.addChild(scoreWrite);
scoreWrite.x = screenX/10
scoreWrite.y = screenY+(border/2)

// --- Main program --- //

function update(delta) {
app.renderer.render(app.stage)
sprite_test.x += movX 
sprite_test.y += movY
sprite_test.rotation += rotation
sprite_test.tint = 0xFFFFFF

scoreWrite.text = "Score : "+score +"                                                                                  Life :"+lives

if(rotation > 0.15){rotation = 0.15}
if(rotation < -0.15){rotation = -0.15}

// Need to fix
if(movX > 2){movX = 2}
if(movY > 2){movY = 2}

if(movX < -2){movX = -2}
if(movY < -2){movY = -2}



OOB();

if (cooldownDelay < cooldownMax){cooldownDelay+= 1}

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
    selectBeam.x += selectBeam.speed*Math.sin(selectBeam.rotation)
    selectBeam.y -= selectBeam.speed*Math.cos(selectBeam.rotation)

    if (selectBeam.x > screenX+10 || selectBeam.y > screenY+10+border || selectBeam.x < -10 || selectBeam.y < -10){
        fireList.splice(z,1)
    }
}


// Asteroid collision check with beam
for(let i = 0; i<asteroidList.length ; i++){
    const selectAsteroid = asteroidList[i]
    const astX = selectAsteroid.x 
    const asty = selectAsteroid.y


    for(let b = 0;b<fireList.length ;b++){
        const checkBeam = fireList[b]
        
        if (Math.abs(selectAsteroid.x - checkBeam.x )<=10 && Math.abs(selectAsteroid.y - checkBeam.y )<=10){
            checkBeam.height = 0
            selectAsteroid.height = 0
            score += 50 
            fireList.splice(b,1)
            asteroidList.splice(i,1)
    
    }
}
    
    for(let u = 0; u<asteroidList.length ; u++){
        const colisionAsteroid = asteroidList[u]
        const astX = colisionAsteroid.x 
        const asty = colisionAsteroid.y
    
    
    
    if(Math.abs (colisionAsteroid.x - sprite_test.x )<= 24 && Math.abs (colisionAsteroid.y - sprite_test.y )<= 24 ){
        //console.log(" --- COLLISSION --- ")
        sprite_test.tint = 0xFF0000  // RGB --> R--
        if (lives > 0){
            colisionAsteroid.height = 0
            colisionAsteroid.x = 5000
            asteroidList.splice(u,0)
            lives--
        }
        else(alert("Gameover your score was "+ score))
    }

}

}

}

sprite_test.pivot.x = 16
sprite_test.pivot.y = 16


function moveUp(){
    //if(Math.abs(movX)+Math.abs(movY) <= (3) )
    //{
        movY -= Math.cos(sprite_test.rotation);
        movX += Math.sin(sprite_test.rotation);  
    //}
}

function moveDown(){
    //if(Math.abs(movX)+Math.abs(movY) <= (3))
    //{
        movY += Math.cos(sprite_test.rotation);
        movX -= Math.sin(sprite_test.rotation);
    //}
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

/*
Create a projectile after a timer
*/
function fireBeam(){
if (cooldownDelay == cooldownMax){
    const pew = PIXI.Sprite.from("assets/ressources/beam.png")
    pew.anchor.set(0.5)
    pew.x = sprite_test.x
    pew.y = sprite_test.y
    pew.rotation = sprite_test.rotation
    pew.speed = 5
    fireList.push(pew)
    app.stage.addChild(pew)
    cooldownDelay = 0
}
}

/*
Add an asteroid
*/
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

