export default class Input{
    constructor(socket){
        this.socket = socket
        this.key = {
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

        setInputs()
    }
    playerVetorKeyDown(event) {
        if(playerVetor.x == 0 && key.getVetor(event.keyCode))
            playerVetor.x = playerVetor.x || key.getVetor(event.keyCode).x
        if(playerVetor.y == 0 && key.getVetor(event.keyCode))
            playerVetor.y = playerVetor.y || key.getVetor(event.keyCode).y
        return playerVetor
    }
    playerVetorKeyUp(event) {
        if(key.getVetor(event.keyCode).x == playerVetor.x) playerVetor.x = 0
        if(key.getVetor(event.keyCode).y == playerVetor.y) playerVetor.y = 0
        return playerVetor
    }
}

function setInputs(){
    document.onkeyup = function(event){
        if(game.playerId){
            input.playerVetorKeyUp(event)
            game.pararMoverPersonagem(game.playerId)
        }
    }
    document.addEventListener("click", (event)=>{
        const bomba = game.spawnBomba(bomb++, event.clientX, event.clientY)
        setInterval(()=>{
            game.detonarBomba(bomba.id)
        },2000)
    }, false);
}
