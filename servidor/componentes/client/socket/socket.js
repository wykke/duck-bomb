import Game from "../game/game.js"
import Input from "../input/input.js"

export default class Socket{
    constructor(){
        this.socket = io()
        this.game = new Game(this)
        this.input = new Input(this)

        setupSockets(this)
    }
    spawn(name){
        this.socket.emit("spawn", name)
    }
    move(x, y){
        this.socket.emit("move", x, y)
    }
    placeBomb(posX, posY){
        this.socket.emit("placeBomb", posX, posY)
    }
}

function setupSockets(s){
    const socket = s.socket

    socket.on('spawn', ({tipo, id, posX, posY, playerName}) => {
        if(s.game.estadoAtual === s.game.estados.offline){
            s.game.newGame()
            s.game.playerPrincipal = s.game.tipoSpawn[tipo](id, posX, posY, playerName, true)
            console.log("seu personagem:",playerName)
        }else{
            s.game.tipoSpawn[tipo](id, posX, posY, playerName, false)
        }
        
    })

    socket.on('remove', ({id}) => {
        console.log("remove", id)
        s.game.removerObjeto(id)
    })

    socket.on('move', ({id, posX, posY}) => {
        s.game.moverObjeto(id, posX, posY)
    })

    socket.on('explodirBomba', ({id, tamanho}) => {
        console.log("explodir", id)
        s.game.detonarBomba(id, tamanho)
    })
}
