export default class Objeto{
    constructor(id, posicaoX, posicaoY, spriteIdle){
        this.id = id
        this.posicaoX = posicaoX
        this.posicaoY = posicaoY
        this.spriteIdle = spriteIdle
        this.dom = document.createElement("div")
        
        this.dom.classList.add("objeto")
    }
}

