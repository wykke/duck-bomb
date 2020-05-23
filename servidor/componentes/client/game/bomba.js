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
        const left = -this.dom.parentElement.offsetWidth
        const top = -this.dom.parentElement.offsetWidth-
            this.dom.offsetTop+
            this.dom.parentElement.offsetTop

        image.src = this.spriteExplosao
        image.style.position = "absolute"
        image.style.width = (tamanho*2-1)+"00%"
        image.style.left = left+"px"
        image.style.top = top+"px"
        
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