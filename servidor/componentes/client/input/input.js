export default class Input{
    constructor(socket){
        this.socket = socket
        this.playerVetor = { x: 0, y: 0}
        this.key = {
            keyLeft: 37,
            keyUp: 38,
            keyRight: 39,
            keyDown: 40,
            keyW: 87,
            keyA: 65,
            keyS: 83,
            keyD: 68,
            vetores: {
                37: {x:-1, y:0},
                38: {x:0, y:-1},
                39: {x:1, y:0},
                40: {x:0, y:1},
                65: {x:-1, y:0},
                87: {x:0, y:-1},
                68: {x:1, y:0},
                83: {x:0, y:1},
            },
            getVetor: function(vkey){
                return this.vetores[vkey]
            }
        }
    }
    playerKeyDown(event) {
        if(this.key.getVetor(event.keyCode)){
            const xAtual = this.playerVetor.x
            const yAtual = this.playerVetor.y
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
