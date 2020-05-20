import Personagem from "./personagem.js"
import Bomba from "./bomba.js"
import Mapa from "./mapa.js"

export default class Game{
    constructor(socket){
        this.canvas = document.getElementById("canvas")
        this.mapa = new Mapa(50, 50)
        this.socket = socket
        
        this.estados = {
            offline: 0,
            jogando: 1
        }
        this.estadoAtual = this.estados.offline

        this.tipoSpawn = []
        this.tipoSpawn["personagem"] = (id, posicaoX, posicaoY, playerName) => 
            this.spawnPersonagem(id, posicaoX, posicaoY, playerName)
        this.tipoSpawn["bomba"] = (id, posicaoX, posicaoY) => 
            this.spawnBomba(id, posicaoX, posicaoY)
    }
    newGame(){
        this.canvas.removeChild(this.canvas.querySelector(".splash"))
        this.canvas.style.backgroundColor = "white"
        this.estadoAtual = this.estados.jogando
        this.mapa.openMap()
    }
    removerObjeto(id){
        this.mapa.removerObjeto(id)
    }
    spawnPersonagem(id, posicaoX, posicaoY, playerName){
        const novoPersonagem = new Personagem(id, playerName, posicaoX, posicaoY)
        this.mapa.spawnObjeto(novoPersonagem, posicaoX, posicaoY)
    }
    moverObjeto(id, posicaoX, posicaoY){
        this.mapa.objetos.get(id).mover(posicaoX, posicaoY)
    }
    pararMoverObjeto(id){
        this.mapa.objetos.get(id).pararMover()
    }
    spawnBomba(id, posicaoX, posicaoY){
        const novaBomba = new Bomba(id, posicaoX, posicaoY)
        this.mapa.spawnObjeto(novaBomba, posicaoX, posicaoY)
        return novaBomba
    }
    detonarBomba(id){
        if(this.mapa.objetos.get(id)) 
            this.mapa.objetos.get(id).detonar().then(()=>{
                this.mapa.removerObjeto(id)
            })
    }
}