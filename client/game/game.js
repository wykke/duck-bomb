import Personagem from "./personagem.js"
import Mapa from "./mapa.js"

export default class Game{
    constructor(){
        this.canvas = document.getElementById("canvas")
        this.mapa = new Mapa()
    }
    newGame(){
        this.canvas.style.backgroundColor = "black"
    }
    spawnPersonagem(playerName, id, posicaoX, posicaoY){
        const novoPersonagem = new Personagem(playerName, id, posicaoX, posicaoY)
        this.mapa.spawnObjeto(novoPersonagem)
    }
}