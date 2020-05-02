import Objeto from "./objeto.js"

export default class Bomba extends Objeto{
    constructor(id, posicaoX, posicaoY, layer, spriteIdle, spriteExplosao){
        super(id, posicaoX, posicaoY, layer, spriteIdle)
        this.spriteExplosao = spriteExplosao
    }
    detonar(){
        
    }
}