import Objeto from "./objeto.js"
import sprites from "../assets/sprites.js"

export default class Bomba extends Objeto{
    constructor(id, posicaoX, posicaoY){
        const spriteIdle = sprites.folder + sprites.bomba
        super(id, posicaoX-20, posicaoY-20, spriteIdle)
        this.spriteExplosao = sprites.folder + sprites.bombaExplosao

        this.createDom()
    }
    detonar(){
        const animationDelay = 300
        const explosionDelay = 1000
        this.dom.getElementsByTagName("img")[0].src = this.spriteExplosao

        if(!document.hidden){
            $(this.dom.getElementsByTagName("img")[0]).animate(
                {
                    width: "300px",
                    height: "300px",
                }, animationDelay)
            $(this.dom).animate(
                {
                    top: (this.posicaoY-130)+"px",
                    left: (this.posicaoX-130)+"px"
                },animationDelay)
        }
        else{
            this.dom.style.width = "300px"
            this.dom.style.height = "300px"
        }

        return new Promise((resolve)=>{
            setTimeout(()=>{resolve()}, animationDelay+explosionDelay)
        })
    }
    createDom(){
        this.dom.classList.add("bomba")
        let sprite = document.createElement("img")
        sprite.src = this.spriteIdle
        
        this.dom.appendChild(sprite)
        this.dom.style.left = this.posicaoX+"px"
        this.dom.style.top = this.posicaoY+"px"
    }
}