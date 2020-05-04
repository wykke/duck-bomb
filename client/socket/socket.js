import Game from "../game/game.js"
import Input from "../input/input.js"

export default class Socket{
    constructor(){
        this.socket = io()
        this.game = new Game(this)
        this.input = new Input(this)

        setupSockets(this)
    }
}

function setupSockets(s){
    socket = s.socket

    socket.on('spawn', (tipo, id, posX, posY, playerName) => {
        if(s.game.estadoAtual == s.game.estados.offline){
            s.game.newGame()
        }
        s.game.tipoSpawn[tipo](id, posX, posY, playerName)
    })

    socket.on('remove', (id) => {
        s.game.removerObjeto(id)
    })

    socket.on('move', (id, posX, posY) => {
        s.game.removerObjeto(id)
    })

    socket.on('stopMove', (id) => {
        s.game.removerObjeto(id)
    })

    socket.on('explodirBomba', (id) => {
        s.game.detonarBomba(id)
    })
}