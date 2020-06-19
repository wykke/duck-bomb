import Socket from "./socket/socket.js"

const socket = new Socket()

$(".splash").load("./assets/mainMenu.html", ()=>{
    document.getElementById("btnStart").onclick = startGame
    document.getElementById("config").onclick = configuration
    document.getElementById("musicaslider").onchange = volumeChangeMusica
    document.getElementById("efeitosslider").onchange = volumeChangeEfeitos
})

function startGame(){
    setTimeout(()=>{
        socket.spawn(document.getElementById("nome").value)
    },200)
}

function configuration(){
    if(document.getElementById("configsplash").style.visibility == "visible"){
        document.getElementById("configsplash").style.visibility = "hidden"
    }else{
        document.getElementById("configsplash").style.visibility = "visible"
    }
}

function volumeChangeMusica(){
    document.querySelector(".musica").volume = 
        socket.game.backgroundVolume * document.getElementById("musicaslider").value/100
}

function volumeChangeEfeitos(){
    document.querySelectorAll(".efeitos").forEach(audio => {
        audio.volume = document.getElementById("efeitosslider").value/100
    })
}

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
        const target = event.target
        const clientX = Number.parseInt(target.getAttribute("x"))
        const clientY = Number.parseInt(target.getAttribute("y"))
        if(clientX){
            socket.input.playerClick(clientX, clientY)
        }
    }
}, false);
document.addEventListener('mousedown', function (event) {
    if (event.detail > 1) {
      event.preventDefault();
    }
}, false);
