import Game from "../game/game.js"

const game = new Game()
game.newGame()
game.spawnPersonagem(100, "alex", 200, 200)
game.spawnPersonagem(101, "robson", 200, 100)

let x = 200
const timer = setInterval(()=>{
    game.moverPersonagem(100, x+=1, 200)
}, 1000/60)
setTimeout(()=>{
    clearInterval(timer)
    game.pararMoverPersonagem(100)
},5000)
