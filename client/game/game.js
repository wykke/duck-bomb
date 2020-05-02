import Personagem from "./personagem.js"
import Bomba from "./bomba.js"
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
    removerObjeto(id){
        this.mapa.removerObjeto(id)
    }
    spawnPersonagem(id, playerName, posicaoX, posicaoY){
        const novoPersonagem = new Personagem(id, playerName, posicaoX, posicaoY)
        this.mapa.spawnObjeto(novoPersonagem)
    }
    moverPersonagem(id, posicaoX, posicaoY){
        this.mapa.objetos.get(id).mover(posicaoX, posicaoY)
    }
    pararMoverPersonagem(id){
        this.mapa.objetos.get(id).pararMover()
    }
    spawnBomba(id, posicaoX, posicaoY){
        const novaBomba = new Bomba(id, posicaoX, posicaoY)
        this.mapa.spawnObjeto(novaBomba)
    }
}