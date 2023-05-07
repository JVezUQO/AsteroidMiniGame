window.addEventListener("keydown", (clavier) => {

console.log(clavier)
if(clavier.key == "ArrowDown"){
    //alert("ArrowDown")
    moveDown()
}
if(clavier.key == "ArrowUp"){
    //alert("ArrowDown")
    moveUp()
}
if(clavier.key == "ArrowLeft"){
    //alert("ArrowDown")
    moveLeft()
}
if(clavier.key == "ArrowRight"){
    //alert("ArrowDown")
    moveRight()
}
if(clavier.key == " "){
    //alert("ArrowDown")
    fireBeam()
}
})
