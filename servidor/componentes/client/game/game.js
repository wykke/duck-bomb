import Personagem from "./personagem.js"
import Bomba from "./bomba.js"
import Mapa from "./mapa.js"

import Arbusto from "./estaticos/arbusto.js"
import Pedra from "./estaticos/pedra.js"

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

        this.mapa.spawnObjeto(new Arremesso(123456, 0, 0), 0, 0)
        this.mapa.spawnObjeto(new MultiBomba(123456, 1, 0), 1, 0)
        this.mapa.spawnObjeto(new SuperBomba(123456, 2, 0), 2, 0)
        this.mapa.spawnObjeto(new Velocidade(123456, 3, 0), 3, 0)
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