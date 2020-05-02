import Objeto from "./objeto.js"

export default class Personagem extends Objeto{
    constructor(posicaoX, posicaoY, tamanhoX, tamanhoY, layer, spriteIdle, spriteMovimento){
        super(posicaoX, posicaoY, tamanhoX, tamanhoY, layer, spriteIdle)
        this.spriteMovimento = spriteMovimento
    }
    mover(){

    }
}
