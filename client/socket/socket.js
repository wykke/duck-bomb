import Game from "../game/game.js"

const game = new Game()
game.newGame()
game.spawnPersonagem(100, "alex", 200, 200)

setTimeout(()=>{
    game.moverPersonagem(100, 500, 200)
}, 2000)
