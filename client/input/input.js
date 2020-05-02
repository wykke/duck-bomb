export default {playerVetorKeyDown, playerVetorKeyUp}

const key = {
    keyLeft: 37,
    keyUp: 38,
    keyRight: 39,
    keyDown: 40,
    vetores: [
        {x:-1, y:0},
        {x:0, y:-1},
        {x:1, y:0},
        {x:0, y:1},
    ],
    getVetor: function(vkey){
        return key.vetores[vkey-key.keyLeft]
    }
}

const playerVetor = {x:0, y:0}

function playerVetorKeyDown(event) {
    if(playerVetor.x == 0) playerVetor.x = playerVetor.x || key.getVetor(event.keyCode).x
    if(playerVetor.y == 0) playerVetor.y = playerVetor.y || key.getVetor(event.keyCode).y
    return playerVetor
};

function playerVetorKeyUp(event) {
    if(key.getVetor(event.keyCode).x == playerVetor.x) playerVetor.x = 0
    if(key.getVetor(event.keyCode).y == playerVetor.y) playerVetor.y = 0
    return playerVetor
};