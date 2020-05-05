module.exports = function(sockets){

let playerList = []
let bombList = []
const fps = (1000/30).toFixed(0)
let id = 0

sockets.on('connection', socket => {
    console.log("conectado:", socket.conn.remoteAddress)

    socket.on('spawn', name => {
        console.log(socket.id,"spawn",name)
        socket.emit('spawn', "personagem", socket.id, 500, 250, name)
        for(players in playerList){
            playerList[players].socket.emit('spawn', socket.id, 500, 250, name)
            socket.emit('spawn', "personagem", playerList[players].socket.id, playerList[players].x, playerList[players].y, playerList[players].name)
        }
        playerList[socket.id] = createPlayer(name, 500, 250, socket)
    })

    socket.on('move', (x, y) => {
        console.log(socket.id,"move",x,y)
        playerList[socket.id].dirx=x
        playerList[socket.id].diry=y
    })

    socket.on('placeBomb', (x, y) => {
        for(const p in playerList){
            playerList[p].socket.emit('spawn', "bomba", id, x, y)
        }
        new explodir(id)
        id++
    })

})

function explodir(id){
    this.id = id
    this.timer = setTimeout(()=>{
        for(const p in playerList){
            playerList[p].socket.emit('explodirBomba', id)
        }
    },2000)
}

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
    }else{
        for(p in playerList){
            playerList[p].socket.emit('stopMove', player.socket.id)
        }
    }
}

}

