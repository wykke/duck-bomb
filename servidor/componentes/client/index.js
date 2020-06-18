import Socket from "./socket/socket.js"
import sprites from "./assets/sprites.js"

const socket = new Socket()

createMainScreen()

function startGame(){
    setTimeout(()=>{
        socket.spawn(document.getElementById("nome").value)
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

function createMainScreen(){
    const splash = document.querySelector(".splashMap")
    splash.style.gridTemplateColumns = `repeat(${50}, min-content)`

    for(let y=0; y<50; y++){
        for(let x=0; x<50; x++){
            const dom = document.createElement("div")
            dom.classList.add("chao")
            dom.setAttribute("x",x)
            dom.setAttribute("y",y)
            let sprite = document.createElement("img")
            sprite.src = "./assets/" + sprites.folder + sprites.chao
            dom.appendChild(sprite)
            splash.appendChild(dom)
        }
    }
}