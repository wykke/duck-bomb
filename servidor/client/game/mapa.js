export default class Mapa{
    constructor(){
        this.objetos = new Map()
    }
    spawnObjeto(objeto){
        document.getElementById("objetos").appendChild(objeto.dom)
        this.objetos.set(objeto.id, objeto)
    }
    removerObjeto(id){
        $(this.objetos.get(id).dom).remove()
        this.objetos.delete(id)
    }
}