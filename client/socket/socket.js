import Game from "../game/game.js"
import input from "../input/input.js"

const game = new Game()
let bomb = 2
game.playerId = 1

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
document.addEventListener("click", (event)=>{
    const bomba = game.spawnBomba(bomb++, event.clientX, event.clientY)
    setInterval(()=>{
        game.detonarBomba(bomba.id)
    },2000)
}, false);

game.newGame()
game.spawnPersonagem(game.playerId, "alex", 200, 200)
