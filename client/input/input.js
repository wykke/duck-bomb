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
                return this.vetores[vkey-this.keyLeft]
            }
        }
    }
    playerKeyDown(event) {
        const xAtual = this.playerVetor.x
        const yAtual = this.playerVetor.y

        if(this.key.getVetor(event.keyCode)){
            this.playerVetor.x = this.key.getVetor(event.keyCode).x || this.playerVetor.x
            this.playerVetor.y = this.key.getVetor(event.keyCode).y || this.playerVetor.y

            if(xAtual != this.playerVetor.x || yAtual != this.playerVetor.y)
                this.socket.move(this.playerVetor.x, this.playerVetor.y)
        }
            
    }
    playerKeyUp(event) {
        const xAtual = this.playerVetor.x
        const yAtual = this.playerVetor.y

        if(this.key.getVetor(event.keyCode)){
            if(this.key.getVetor(event.keyCode).x == this.playerVetor.x)
                this.playerVetor.x = 0
            if(this.key.getVetor(event.keyCode).y == this.playerVetor.y)
                this.playerVetor.y = 0
            if(xAtual != this.playerVetor.x || yAtual != this.playerVetor.y)
                this.socket.move(this.playerVetor.x, this.playerVetor.y)
        }      
    }
    playerClick(posX, posY){
        this.socket.placeBomb(posX, posY)
    }
}
