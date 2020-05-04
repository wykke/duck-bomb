import Game from "../game/game.js"
import Input from "../input/input.js"

export default class Socket{
    constructor(){
        this.socket = io()
        this.game = new Game(this)
        this.input = new Input(this)

        this.game.newGame()
    }
}

function setupSockets(socket){

}