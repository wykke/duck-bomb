class Config{
    constructor(){

    }
    get musicaVolume(){
        return document.getElementById("musicaslider").value / 100
    }
    get efeitosVolume(){
        return document.getElementById("efeitosslider").value / 100
    }
}

var config = new Config()

export default () => {
    return config
}