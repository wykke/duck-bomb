module.exports = function(sockets){

let playerList = []
const fps = (1000/30).toFixed(0)
let id = 0

sockets.on('connection', socket => {
    socket.on('spawn', name => {
        console.log(socket.id,"spawn",id)
        socket.emit('selfSpawn', id, socket.id, 500, 250)
        for(players in playerList){
            playerList[players].socket.emit('spawn', id, socket.id, 500, 250)
            socket.emit('spawn', playerList[players].name, playerList[players].socket.id, playerList[players].x, playerList[players].y)
        }
        playerList[socket.id] = createPlayer(id++, 500, 250, socket)
    })

    socket.on('moveUp', () => {
        console.log(socket.id,"moveUp")
        playerList[socket.id].diry=-1
    })

    socket.on('moveDown', () => {
        console.log(socket.id,"moveDown")
        playerList[socket.id].diry=1
    })

    socket.on('moveLeft', () => {
        console.log(socket.id,"moveLeft")
        playerList[socket.id].dirx=-1
    })

    socket.on('moveRight', () => {
        console.log(socket.id,"moveRight")
        playerList[socket.id].dirx=1
    })

    socket.on('stopMoveUp', ()=>{
        console.log(socket.id,"stopMoveUp")
        playerList[socket.id].diry=0
    })

    socket.on('stopMoveDown', ()=>{
        console.log(socket.id,"stopMoveDown")
        playerList[socket.id].diry=0
    })

    socket.on('stopMoveLeft', ()=>{
        console.log(socket.id,"stopMoveLeft")
        playerList[socket.id].dirx=0
    })

    socket.on('stopMoveRight', ()=>{
        console.log(socket.id,"stopMoveRight")
        playerList[socket.id].dirx=0
    })
})

setInterval(()=>{
    for(const p in playerList){
        move(playerList[p])
    }
}, fps)

function createPlayer(name, x, y, socket){
    return {name, x, y, dirx:0, diry:0, socket}
}

function move(player){
    if(player.dirx || player.diry){
        player.x = player.x + 7 * player.dirx
        player.y = player.y + 7 * player.diry
        
        for(p in playerList){
            playerList[p].socket.emit('move', player.socket.id, player.x, player.y)
        }
    }
}

}

