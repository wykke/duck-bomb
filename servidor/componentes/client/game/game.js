import Personagem from "./personagem.js"
import Bomba from "./bomba.js"
import Mapa from "./mapa.js"

import Arbusto from "./estaticos/arbusto.js"
import Pedra from "./estaticos/pedra.js"
import Parede1 from "./estaticos/parede1.js"
import Parede2 from "./estaticos/parede2.js"

import Arremesso from "./powerup/arremesso.js"
import MultiBomba from "./powerup/multiBomba.js"
import SuperBomba from "./powerup/superBomba.js"
import Velocidade from "./powerup/velocidade.js"

export default class Game{
    constructor(socket){
        this.canvas = document.getElementById("canvas")
        this.mapa = new Mapa(50, 50)
        this.socket = socket
        this.playerPrincipal
        
        this.estados = {
            offline: 0,
            jogando: 1,
            gameOver: 2
        }
        this.estadoAtual = this.estados.offline

        this.tipoSpawn = []
        this.tipoSpawn["personagem"] = (id, posicaoX, posicaoY, playerName, playerPrincipal) => 
            this.spawnPersonagem(id, posicaoX, posicaoY, playerName, playerPrincipal)
        this.tipoSpawn["bomba"] = (id, posicaoX, posicaoY) => 
            this.spawnBomba(id, posicaoX, posicaoY)
    }
    newGame(){
        this.canvas.removeChild(this.canvas.querySelector(".splash"))
        this.canvas.querySelector(".startGame").remove()
        this.canvas.style.backgroundColor = "white"
        this.estadoAtual = this.estados.jogando
        this.mapa.openMap()
    }
    removerObjeto(id){
        if(id === this.playerPrincipal.id){
            console.log("game over")
            this.gameOver()
        }
        else
            this.mapa.removerObjeto(id)
    }
    gameOver(){
        this.estadoAtual = this.estados.gameOver
        $(".gameOverSplash > div").load("../assets/gameOver.html")
    }
    spawnObject(tipo, id, posicaoX, posicaoY){
        const tipos = {
            "arbusto": () => new Arbusto(id, posicaoX, posicaoY),
            "pedra": () => new Pedra(id, posicaoX, posicaoY),
            "parede1": () => new Parede1(id, posicaoX, posicaoY),
            "parede2": () => new Parede2(id, posicaoX, posicaoY),

            "arremesso": () => new Arremesso(id, posicaoX, posicaoY),
            "multibomba": () => new MultiBomba(id, posicaoX, posicaoY),
            "superbomba": () => new SuperBomba(id, posicaoX, posicaoY),
            "velocidade": () => new Velocidade(id, posicaoX, posicaoY),
        }
        const novoObjeto = tipos[tipo]()
        this.mapa.spawnObjeto(novoObjeto, posicaoX, posicaoY)
        return novoObjeto
    }
    spawnPersonagem(id, posicaoX, posicaoY, playerName, playerPrincipal){
        const novoPersonagem = new Personagem(id, playerName, posicaoX, posicaoY, playerPrincipal)
        this.mapa.spawnObjeto(novoPersonagem, posicaoX, posicaoY)
        return novoPersonagem
    }
    moverObjeto(id, posicaoX, posicaoY){
        this.mapa.objetos.get(id).mover(posicaoX, posicaoY)
    }
    spawnBomba(id, posicaoX, posicaoY){
        const novaBomba = new Bomba(id, posicaoX, posicaoY)
        this.mapa.spawnObjeto(novaBomba, posicaoX, posicaoY)
        return novaBomba
    }
    detonarBomba(id, tamanho){
        if(this.mapa.objetos.get(id)) 
            this.mapa.objetos.get(id).detonar(tamanho).then(()=>{
                this.mapa.removerObjeto(id)
            })
    }
}