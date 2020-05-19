export default class Mapa{
    constructor(tamX, tamY){
        this.domMapa = document.getElementById("mapa")
        this.chao = Array(tamX).fill(Array(tamY))
        this.tamX = tamX
        this.tamY = tamY
        this.objetos = new Map()
 
        this.domMapa.style.gridTemplateColumns = `repeat(${tamX}, min-content)`
    }
    openMap(){
        for(let y=0; y<this.tamY; y++){
            for(let x=0; x<this.tamX; x++){
                const dom = document.createElement("div")
                dom.classList.add("chao")
                dom.setAttribute("x",x)
                dom.setAttribute("y",y)
                dom.innerText = `(${x}, ${y})`
                this.domMapa.appendChild(dom)
                this.chao[x][y] = dom
            }
        }
    }
    spawnObjeto(objeto, posX, posY){
        document.getElementById("mapa").appendChild(objeto.dom)
        this.objetos.set(objeto.id, objeto)
    }
    removerObjeto(id){
        $(this.objetos.get(id).dom).remove()
        this.objetos.delete(id)
    }
}