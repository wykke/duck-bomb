import Objeto from "./objeto.js"
import sprites from "./sprites.js"

export default class Personagem extends Objeto{
    constructor(playerName, id, posicaoX, posicaoY){
        const layer = 2
        const spriteIdle = sprites.folder + sprites.persongemIdle
        super(posicaoX, posicaoY, layer, spriteIdle)

        this.playerName = playerName
        this.id = id
        this.spriteMovimento = sprites.folder + sprites.personagemMove

        this.createDom()
    }
    mover(){

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
