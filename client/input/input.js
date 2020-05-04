export default class Input{
    constructor(socket){
        this.socket = socket
        this.playerVetor = { x: 0, y: 0}
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
        document.onkeyup = function(event){
            if(this.socket.game.estadoAtual == this.socket.game.estados.jogando){
                this.playerKeyUp(event)
            }
        }
        document.onkeydown = function(event){
            if(this.socket.game.estadoAtual == this.socket.game.estados.jogando){
                this.playerKeyDown(event)
            }
        }
        document.addEventListener("click", (event)=>{
            if(this.socket.game.estadoAtual == this.socket.game.estados.jogando){
                this.playerClick(event.clientX, event.clientY)
            }
        }, false);
    }
    playerKeyDown(event) {
        xAtual = this.playerVetor.x
        yAtual = this.playerVetor.y

        if(this.playerVetor.x == 0 && this.key.getVetor(event.keyCode))
            this.playerVetor.x = this.playerVetor.x || this.key.getVetor(event.keyCode).x
        if(this.playerVetor.y == 0 && this.key.getVetor(event.keyCode))
            this.playerVetor.y = this.playerVetor.y || this.key.getVetor(event.keyCode).y
        if(xAtual != this.playerVetor.x || yAtual != this.playerVetor.y)
            this.socket.move(this.playerVetor.x, this.playerVetor.y)
    }
    playerKeyUp(event) {
        xAtual = this.playerVetor.x
        yAtual = this.playerVetor.y

        if(key.getVetor(event.keyCode).x == playerVetor.x)
            this.playerVetor.x = 0
        if(key.getVetor(event.keyCode).y == playerVetor.y)
            this.playerVetor.y = 0
        if(xAtual != this.playerVetor.x || yAtual != this.playerVetor.y)
            this.socket.move(this.playerVetor.x, this.playerVetor.y)
    }
    playerClick(posX, posY){
        this.socket.placeBomb(posX, posY)
    }
}
