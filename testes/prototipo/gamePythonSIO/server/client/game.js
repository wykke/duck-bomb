var animationDelay = 10
var movement = { x: 0, y: 0 }
var characters = new Map()
var selfId = 0

const socket = io()
socket.emit('spawn', "alex")

socket.on('selfSpawn', (name, id, x, y) => {
    spawnCharacter(name, id, x, y)
    selfId = id
})

socket.on('spawn', ({name, id, x, y})=>{
    console.log('spawn', name, id, x, y)
    spawnCharacter(name, id, x, y)
})

socket.on('move', ({id, x, y})=>{
    console.log("move")
    move(id, x, y)
})

socket.on('remove', id => {
    console.log("remove", id)
    $(characters[id]).remove()
    characters.delete(id)
})

function spawnCharacter(playerName, id, x, y){
    let newPlayer = document.createElement("div")
    newPlayer.id = "bola"
    let sprite = document.createElement("img")
    sprite.src = "./sprite.png"
    let name = document.createElement("p")
    name.innerText = "player " + playerName

    newPlayer.appendChild(name)
    newPlayer.appendChild(sprite)
    newPlayer.style.left = x+"px"
    newPlayer.style.top = y+"px"
    
    document.getElementById("players").appendChild(newPlayer)
    characters[id] = newPlayer
}

function move(id, x, y){
    //*
    if(!document.hidden)
        $(characters[id]).animate(
            {
                left: x+"px", 
                top: y+"px"
            }, animationDelay);
    else{
        $(characters[id]).css("left", x+"px")
        $(characters[id]).css("top", y+"px")
    }
    //*/
    //$(characters[id]).css("left", x+"px")
    //$(characters[id]).css("top", y+"px")
}

document.onkeydown = function(event) {
    switch (event.keyCode) {
        case 32:
            break;
        case 37:
            if(movement.x !== -1){
                socket.emit("moveLeft")
                movement.x = -1
            }
            break;
        case 38:
            if(movement.y !== 1){
                socket.emit("moveUp")
                movement.y = 1
            }
            break;
        case 39:
            if(movement.x !== 1){
                socket.emit("moveRight")
                movement.x = 1
            }
            break;
        case 40:
            if(movement.y !== -1){
                socket.emit("moveDown")
                movement.y = -1
            }
            break;
    }
};

document.onkeyup = function(event) {
    switch (event.keyCode) {
        case 37:
            if(movement.x === -1) {
                socket.emit('stopMoveLeft')
                movement.x = 0
            }
            break;
        case 38:
            if(movement.y === 1){
                socket.emit('stopMoveUp')
                movement.y = 0
            }
            break;
        case 39:
            if(movement.x === 1) {
                socket.emit('stopMoveRight')
                movement.x = 0
            }
            break;
        case 40:
            if(movement.y === -1) {
                socket.emit('stopMoveDown')
                movement.y = 0
            }
            break;
    }
};
