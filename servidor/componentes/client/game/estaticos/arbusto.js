import Objeto from "../objeto.js"
import sprites from "../../assets/sprites.js"

export default class Arbusto extends Objeto{
    constructor(id, posicaoX, posicaoY){
        const spriteIdle = "../"+sprites.folder + sprites.arbusto
        super(id, posicaoX, posicaoY, spriteIdle)

        this.createDom()
    }
    createDom(){
        this.dom.classList.add("arbusto")
        let sprite = document.createElement("img")
        sprite.src = this.spriteIdle
        
        this.dom.appendChild(sprite)
    }
}