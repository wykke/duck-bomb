import Personagem from "./personagem.js"
import Mapa from "./mapa.js"

export default class Game{
    constructor(){
        this.canvas = document.getElementById("canvas")
        this.mapa = new Mapa()
        this.playerId
    }
    newGame(){
        this.canvas.style.backgroundColor = "black"
    }
    spawnPersonagem(id, playerName, posicaoX, posicaoY){
        const novoPersonagem = new Personagem(id, playerName, posicaoX, posicaoY)
        this.mapa.spawnObjeto(novoPersonagem)
    }
    moverPersonagem(id, posicaoX, posicaoY){
        this.mapa.objetos[id].mover(posicaoX, posicaoY)
    }
    pararMoverPersonagem(id){
        this.mapa.objetos[id].pararMover()
    }
}