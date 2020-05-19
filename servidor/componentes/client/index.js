import Socket from "./socket/socket.js"

const socket = new Socket()

function startGame(){
    setTimeout(()=>{
        socket.game.newGame()
        //socket.spawn(document.getElementById("nome").value)
    },200)
}

document.getElementById("btnStart").onclick = startGame

document.onkeyup = function(event){
    if(socket.game.estadoAtual == socket.game.estados.jogando){
        socket.input.playerKeyUp(event)
    }
}
document.onkeydown = function(event){
    if(socket.game.estadoAtual == socket.game.estados.jogando){
        socket.input.playerKeyDown(event)
    }
}
document.addEventListener("click", (event)=>{
    if(socket.game.estadoAtual == socket.game.estados.jogando){
        //socket.input.playerClick(event.clientX, event.clientY)
    }
}, false);