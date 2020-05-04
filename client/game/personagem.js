import Objeto from "./objeto.js"
import sprites from "../assets/sprites.js"

export default class Personagem extends Objeto{
    constructor(id, playerName, posicaoX, posicaoY){
        const spriteIdle = sprites.folder + sprites.persongemIdle
        super(id, posicaoX, posicaoY, spriteIdle)

        this.playerName = playerName
        this.spriteMovimento = sprites.folder + sprites.personagemMove

        this.createDom()
    }
    mover(posicaoX, posicaoY){
        const animationDelay = 10
        this.posicaoX = posicaoX
        this.posicaoY = posicaoY
        this.dom.getElementsByTagName("img")[0].src = this.spriteMovimento

        if(!document.hidden)
            $(this.dom).animate(
                {
                    left: posicaoX+"px", 
                    top: posicaoY+"px"
                }, animationDelay)
        else{
            this.dom.style.left = posicaoX+"px"
            this.dom.style.top = posicaoY+"px"
        }
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
        this.dom.style.left = this.posicaoX+"px"
        this.dom.style.top = this.posicaoY+"px"
    }
}
