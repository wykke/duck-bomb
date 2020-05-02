import Objeto from "./objeto.js"

export default class Mapa{
    constructor(){
        this.objetos = new Map()
    }
    spawnObjeto(objeto){
        document.getElementById("objetos").appendChild(objeto.dom)
    }
}