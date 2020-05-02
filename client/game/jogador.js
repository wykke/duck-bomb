import Personagem from "./personagem.js"

export default class Jogador extends Personagem{
    constructor(id, playerName, posicaoX, posicaoY){
        super(playerName, id, posicaoX, posicaoY)
    }
    inputMovimento(vetorX, vetorY){

    }
    inputColocarBomba(){

    }
}