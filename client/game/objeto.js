export default class Objeto{
    constructor(id, posicaoX, posicaoY, layer, spriteIdle){
        this.id = id
        this.posicaoX = posicaoX
        this.posicaoY = posicaoY
        this.layer = layer
        this.spriteIdle = spriteIdle
        this.dom = document.createElement("div")
        
        this.dom.classList.add("objeto")
    }
}

