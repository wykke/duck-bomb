import Objeto from "./objeto.js"
import sprites from "../assets/sprites.js"

export default class Bomba extends Objeto{
    constructor(id, posicaoX, posicaoY){
        const spriteIdle = sprites.folder + sprites.bomba
        super(id, posicaoX-20, posicaoY-20, spriteIdle)
        this.spriteExplosao = sprites.folder + sprites.bombaExplosao

        this.createDom()
    }
    detonar(tamanho = 2){
        const animationDelay = 300
        const explosionDelay = 1000

        const image = this.dom.getElementsByTagName("img")[0]

        image.src = this.spriteExplosao
        image.style.position = "relative"
        image.style.width = (tamanho*2-1)+"00%"
        image.style.left = "-10vh"
        image.style.top = "-10vh"
        
        return new Promise((resolve)=>{
            setTimeout(()=>{resolve()}, animationDelay+explosionDelay)
        })
    }
    createDom(){
        this.dom.classList.add("bomba")
        let sprite = document.createElement("img")
        sprite.src = this.spriteIdle
        
        this.dom.appendChild(sprite)
    }
}