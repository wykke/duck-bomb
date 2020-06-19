import sprites from "../../assets/sprites.js"
import audio from "../../assets/sons.js"
import config from "../configuration.js"

export default class PowerUp{
    constructor(){
        this.spritesList = {
            "arremesso": "../"+sprites.folder + sprites.arremesso,
            "multibomba": "../"+sprites.folder + sprites.multiBomba,
            "superbomba": "../"+sprites.folder + sprites.superBomba,
            "velocidade": "../"+sprites.folder + sprites.velocidade,
        }
        this.powerQtd = {
            "arremesso": 0,
            "multibomba": 0,
            "superbomba": 0,
            "velocidade": 0,
        }
        this.hud = document.querySelector(".powerUpList")

        this.audioPowerUp = "../" + audio.folder + audio.powerUp
        this.sound = document.createElement("audio")
        this.sound.classList.add("efeitos")
        this.setSound()
        this.volume = 1

        this.createDom(Object.keys(this.powerQtd))
    }
    setSound(){
        this.sound.src = this.audioPowerUp
        document.getElementById("canvas").appendChild(this.sound)
    }
    setPowerQtd(tipo, qtd){
        this.powerQtd[tipo] = qtd
        const target = this.hud.querySelector("."+tipo)
        if(!target) return

        while(target.hasChildNodes()){
            target.removeChild(target.firstChild)
        }

        for(let i=0; i<qtd; i++){
            const sprite = document.createElement("img")
            sprite.classList.add(tipo+"Sprite")
            sprite.src = this.spritesList[tipo]
            
            target.appendChild(sprite)
        }
        this.sound.volume = this.volume * config().efeitosVolume

        this.sound.play()
    }
    createDom(tipos){
        for(let tipo of tipos){
            const dom = document.createElement("div")
            dom.classList.add("powerUpHud")
            dom.classList.add(tipo)
            this.hud.insertBefore(dom, this.hud.firstChild)
        }
    }
}