import Objeto from "./objeto.js"
import Personagem from "./personagem.js"
import PowerUp from "./powerUp.js"

export default class Mapa{
    constructor(){
        this.objetos = new Map()
    }
    spawnObjeto(objeto){
        document.getElementById("objetos").appendChild(objeto.dom)
        this.objetos[objeto.id] = objeto
    }
}