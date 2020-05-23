import Objeto from "./objeto.js"
import sprites from "../assets/sprites.js"
import Camera from "../input/camera.js"

export default class Personagem extends Objeto{
    constructor(id, playerName, posicaoX, posicaoY, playerPrincipal){
        const spriteIdle = sprites.folder + sprites.persongemIdle
        super(id, posicaoX, posicaoY, spriteIdle)

        this.playerName = playerName
        this.spriteMovimento = sprites.folder + sprites.personagemMove
        this.isMoving = false
        this.player = playerPrincipal
        this.camera = undefined

        this.createDom()
        if(this.player) {
            this.camera = new Camera(this.dom)
            this.camera.moveCamera()
        }
    }
    mover(posicaoX, posicaoY){
        const animationDelay = 100
        this.posicaoX = posicaoX
        this.posicaoY = posicaoY
        const local = document.querySelector(`[x="${posicaoX}"][y="${posicaoY}"]`)
        local.appendChild(this.dom)
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
