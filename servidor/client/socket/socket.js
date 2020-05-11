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

    socket.on('spawn', (tipo, id, posX, posY, playerName) => {
        console.log(tipo)
        if(s.game.estadoAtual == s.game.estados.offline){
            s.game.newGame()
        }
        s.game.tipoSpawn[tipo](id, posX, posY, playerName)
    })

    socket.on('remove', (id) => {
        s.game.removerObjeto(id)
    })

    socket.on('move', (id, posX, posY) => {
        s.game.moverObjeto(id, posX, posY)
    })

    socket.on('stopMove', (id) => {
        s.game.pararMoverObjeto(id)
    })

    socket.on('explodirBomba', (id) => {
        s.game.detonarBomba(id)
    })
}
