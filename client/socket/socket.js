import Game from "../game/game.js"
import input from "../input/input.js"

document.onkeydown = function(event){
    if(game.playerId){
        const vetor = input.playerVetorKeyDown(event)
        const player = game.mapa.objetos[game.playerId]
        game.moverPersonagem(game.playerId, player.posicaoX+vetor.x, player.posicaoY+vetor.y)
    }
}
document.onkeyup = function(event){
    if(game.playerId){
        input.playerVetorKeyUp(event)
        game.pararMoverPersonagem(game.playerId)
    }
}

const game = new Game()
game.newGame()
game.spawnPersonagem(100, "alex", 200, 200)
