export default class Objeto{
    constructor(posicaoX, posicaoY, layer, spriteIdle){
        this.posicaoX = posicaoX
        this.posicaoY = posicaoY
        this.layer = layer
        this.spriteIdle = spriteIdle
        this.dom = document.createElement("div")
        
        this.dom.classList.add("objeto")
    }
}

