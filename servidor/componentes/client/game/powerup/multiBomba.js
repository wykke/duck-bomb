import Objeto from "../objeto.js"
import sprites from "../../assets/sprites.js"

export default class MultiBomba extends Objeto{
    constructor(id, posicaoX, posicaoY){
        const spriteIdle = "../"+sprites.folder + sprites.multiBomba
        super(id, posicaoX, posicaoY, spriteIdle)

        this.createDom()
    }
    createDom(){
        this.dom.classList.add("powerUp")
        this.dom.classList.add("multiBomba")
        let sprite = document.createElement("img")
        sprite.src = this.spriteIdle
        
        this.dom.appendChild(sprite)
    }
}