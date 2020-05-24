import Objeto from "../objeto.js"
import sprites from "../../assets/sprites.js"

export default class SuperBomba extends Objeto{
    constructor(id, posicaoX, posicaoY){
        const spriteIdle = "../"+sprites.folder + sprites.superBomba
        super(id, posicaoX, posicaoY, spriteIdle)

        this.createDom()
    }
    createDom(){
        this.dom.classList.add("powerUp")
        this.dom.classList.add("superBomba")
        let sprite = document.createElement("img")
        sprite.src = this.spriteIdle
        
        this.dom.appendChild(sprite)
    }
}