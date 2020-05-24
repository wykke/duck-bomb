import Objeto from "./objeto.js"
import sprites from "../assets/sprites.js"
import Camera from "../input/camera.js"

export default class Personagem extends Objeto{
    constructor(id, playerName, posicaoX, posicaoY, playerPrincipal){
        const spriteIdle = sprites.folder + sprites.personagemIdleDireita
        super(id, posicaoX, posicaoY, spriteIdle)

        this.playerName = playerName
        this.isMoving = false
        this.player = playerPrincipal
        this.camera = undefined

        this.spriteMovimentoDireita = sprites.folder + sprites.personagemMoveDireita
        this.spriteMovimentoEsquerda = sprites.folder + sprites.personagemMoveEsquerda
        this.spriteMovimentoBaixo = sprites.folder + sprites.personagemMoveBaixo
        this.spriteMovimentoCima = sprites.folder + sprites.personagemMoveCima
        this.spriteIdleDireita = sprites.folder + sprites.personagemIdleDireita
        this.spriteIdleEsquerda = sprites.folder + sprites.personagemIdleEsquerda
        this.spriteIdleBaixo = sprites.folder + sprites.personagemIdleBaixo
        this.spriteIdleCima = sprites.folder + sprites.personagemIdleCima

        this.createDom()
        if(this.player) {
            this.camera = new Camera(this.dom)
            this.camera.moveCamera()
        }
    }
    mover(posicaoX, posicaoY){
        const animationDelay = 300

        if(this.posicaoX != posicaoX || this.posicaoY != posicaoY){
            const x = posicaoX - this.posicaoX
            const y = posicaoY - this.posicaoY
            const timerCamera = setInterval(()=>{
                if(this.player) this.camera.moveCamera()
            },60)
            setTimeout(()=>clearInterval(timerCamera), animationDelay)

            $(this.dom).animate({
                left: 10*x+"vh",
                top: (10*y)-3+"vh"
            }, animationDelay, ()=>{
                this.posicaoX = posicaoX
                this.posicaoY = posicaoY
                const local = document.querySelector(`[x="${posicaoX}"][y="${posicaoY}"]`)
                this.dom.style.left = "0"
                this.dom.style.top = "-3vh"
                local.appendChild(this.dom)
            })
        } 
        if(this.player) this.camera.moveCamera()
    }
    pararMover(){
        this.dom.getElementsByTagName("img")[0].src = this.spriteIdle
    }
    createDom(){
        this.dom.classList.add("personagem")
        let sprite = document.createElement("img")
        sprite.src = this.spriteIdle
        let name = document.createElement("p")
        name.innerText = this.playerName

        this.dom.appendChild(name)
        this.dom.appendChild(sprite)
    }
}
