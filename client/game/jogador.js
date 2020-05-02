import Personagem from "./personagem.js"

export default class Jogador extends Personagem{
    constructor(playerName, id, posicaoX, posicaoY){
        super(playerName, id, posicaoX, posicaoY)
    }
    inputMovimento(vetorX, vetorY){

    }
    inputColocarBomba(){

    }
}