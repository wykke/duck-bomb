export default class Camera{
    constructor(playerDom){
        this.player = playerDom
    }
    moveCamera(){
        this.player.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });
    }
}