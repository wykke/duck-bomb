import Objeto from "./objeto.js"
import sprites from "../assets/sprites.js"
import audio from "../assets/sons.js"
import config from "./configuration.js"

export default class Bomba extends Objeto{
    constructor(id, posicaoX, posicaoY){
        const spriteIdle = sprites.folder + sprites.bomba
        super(id, posicaoX, posicaoY, spriteIdle)
        this.spriteExplosao = sprites.folder + sprites.bombaExplosao
        this.audioExplosao = audio.folder + audio.explosao
        this.sound = document.createElement("audio")
        this.sound.classList.add("efeitos")

        this.createDom()
    }
    detonar(tamanho = 2){
        const animationDelay = 300
        const explosionDelay = 1000

        const image = this.dom.getElementsByTagName("img")[0]

        image.src = this.spriteExplosao
        image.style.position = "relative"
        image.style.width = (tamanho*2)+"00%"
        image.style.left = (-5*(tamanho*2-1))+"vh"
        image.style.top = (-5*(tamanho*2-1))+"vh"
        
        this.sound.volume = this.sound.volume * config().efeitosVolume
        this.sound.play()

        return new Promise((resolve)=>{
            setTimeout(()=>{resolve()}, animationDelay+explosionDelay)
        })
    }
    createDom(){
        this.dom.classList.add("bomba")
        let sprite = document.createElement("img")
        sprite.src = this.spriteIdle
        this.sound.src = this.audioExplosao
        
        this.dom.appendChild(sprite)
        this.dom.appendChild(this.sound)
    }
}