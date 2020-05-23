export default class Camera{
    constructor(playerDom){
        this.player = playerDom
        this.isMoving = false
    }
    moveCamera(){
        if(!this.isMoving){
            this.isMoving = true
            this.scroll()
            setTimeout(()=>{
                this.isMoving = false    
            }, 100)
        }
    }
    scroll(){
        this.player.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });
    }
}