import Game from "../game/game.js"
import input from "../input/input.js"

const game = new Game()
game.playerId = 100

document.onkeydown = function(event){
    if(game.playerId){
        const vetor = input.playerVetorKeyDown(event)
        const player = game.mapa.objetos.get(game.playerId)
        game.moverPersonagem(game.playerId, player.posicaoX+vetor.x*5, player.posicaoY+vetor.y*5)
    }
}
document.onkeyup = function(event){
    if(game.playerId){
        input.playerVetorKeyUp(event)
        game.pararMoverPersonagem(game.playerId)
    }
}

game.newGame()
game.spawnPersonagem(100, "alex", 200, 200)
game.spawnBomba(101, 600, 210)

setTimeout(()=>{
    game.mapa.objetos.get(101).detonar()
}, 3000)

setTimeout(()=>{
    game.removerObjeto(101)
}, 4000)
