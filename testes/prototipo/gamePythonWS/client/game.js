var framerTime = (1000/60).toFixed(0)
var characters = []
var movement = {x:0, y:0}

var connection = new WebSocket('ws://127.0.0.1:8888')
connection.onopen = function(){
    connection.send("start")
}

connection.onmessage = function(msg){
    param = msg.data.split(':')
    cmd = param.shift()
    param.forEach(element => Number.parseInt(element));
    console.log(cmd, param)

    switch(cmd){
        case "spawn":
            spawnCharacter(param[0]-1, param[1], param[2])
            break
        case "move":
            move(param[0], param[1], param[2])
            break
    }
}

function spawnCharacter(playerName, x, y){
    let newPlayer = document.createElement("div")
    newPlayer.id = "bola"
    let sprite = document.createElement("img")
    sprite.src = "./download.png"
    let name = document.createElement("p")
    name.innerText = "player " + playerName

    newPlayer.appendChild(name)
    newPlayer.appendChild(sprite)
    newPlayer.style.left = x+"px"
    newPlayer.style.top = y+"px"
    
    document.getElementById("players").appendChild(newPlayer)
    characters[playerName] = newPlayer
}

function move(num, x, y){
    characters[num].style.left = x+"px"
    characters[num].style.top = y+"px"
}

document.onkeydown = function(event) {
    switch (event.keyCode) {
        case 32:
            break;
        case 37:
            if(movement.x !== -1){
                connection.send("moveLeft")
                movement.x = -1
            }
            break;
        case 38:
            if(movement.y !== 1){
                connection.send("moveUp")
                movement.y = 1
            }
            break;
        case 39:
            if(movement.x !== 1){
                connection.send("moveRight")
                movement.x = 1
            }
            break;
        case 40:
            if(movement.y !== -1){
                connection.send("moveDown")
                movement.y = -1
            }
            break;
    }
};

document.onkeyup = function(event) {
    switch (event.keyCode) {
        case 37:
            if(movement.x === -1) {
                connection.send("stopMoveLeft")
                movement.x = 0
            }
            break;
        case 38:
            if(movement.y === 1) {
                connection.send("stopMoveUp")
                movement.y = 0
            }
            break;
        case 39:
            if(movement.x === 1) {
                connection.send("stopMoveRight")
                movement.x = 0
            }
            break;
        case 40:
            if(movement.y === -1) {
                connection.send("stopMoveDown")
                movement.y = 0
            }
            break;
    }
};
