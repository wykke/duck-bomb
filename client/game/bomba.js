import Objeto from "./objeto.js"

export default class Bomba extends Objeto{
    constructor(posicaoX, posicaoY, tamanhoX, tamanhoY, layer, spriteIdle, spriteExplosao){
        super(posicaoX, posicaoY, tamanhoX, tamanhoY, layer, spriteIdle)
        this.spriteExplosao = spriteExplosao
    }
    detonar(){
        
    }
}