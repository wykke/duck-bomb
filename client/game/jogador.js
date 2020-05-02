import Personagem from "./personagem.js"

export default class Jogador extends Personagem{
    constructor(posicaoX, posicaoY, tamanhoX, tamanhoY, layer, spriteIdle, spriteMovimento){
        super(posicaoX, posicaoY, tamanhoX, tamanhoY, layer, spriteIdle, spriteMovimento)
    }
    inputMovimento(vetorX, vetorY){

    }
    inputColocarBomba(){

    }
}