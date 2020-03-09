import eventlet
import socketio
import threading
import time

eventlet.monkey_patch()
sio = socketio.Server()

app = socketio.WSGIApp(sio, static_files={
    '/': '.\server\client\index.html',
    '/sprite.png': 'D:\WyKKeDriver\WyKKe\Developer\WebDeveloper\Cursos\Curso WebModerno\Projetos\gamePythonSIO\server\client\sprite.png',
    '/style.css': 'D:\WyKKeDriver\WyKKe\Developer\WebDeveloper\Cursos\Curso WebModerno\Projetos\gamePythonSIO\server\client\style.css',
    '/game.js': 'D:\WyKKeDriver\WyKKe\Developer\WebDeveloper\Cursos\Curso WebModerno\Projetos\gamePythonSIO\server\client\game.js',
})

playerList = dict()
id = 0

class Player():
    def __init__(self, name, x, y, socket):
        self.name = name
        self.x = x
        self.y = y
        self.socket = socket
        self.dirX = 0
        self.dirY = 0

class t_move():
    def __init__(self):
        self.thread = threading.Thread(target=self.t_movePlayers)
        self.fps = 1/60
    
    def t_movePlayers(self):
        global playerList
        global sio
        while 1:
            for nplayer in playerList:
                player = playerList[nplayer]
                if(player.dirX or player.dirY):
                    player.x += player.dirX * 6
                    player.y += player.dirY * 6
                    sio.emit('move', {'id':player.socket, 'x':player.x, 'y':player.y}, 'players')
            time.sleep(self.fps)

@sio.event
def connect(sid, environ):
    print('connect ', sid)

@sio.on('spawn')
def spawn(sid, data):
    global id, playerList
    print('message ', data)
    sio.enter_room(sid, 'players')
    sio.emit('spawn', {'name':id, 'id':sid, 'x':100, 'y':250}, 'players')
    for nplayer in playerList:
        player = playerList[nplayer]
        sio.emit('spawn', {'name':player.name, 'id':player.socket, 'x':player.x, 'y':player.y}, sid)
    playerList[sid] = Player(id, 100, 250, sid)
    id += 1

@sio.on('moveUp')
def moveUp(sid):
    global playerList
    playerList[sid].dirY = -1

@sio.on('moveDown')
def moveDown(sid):
    global playerList
    playerList[sid].dirY = 1

@sio.on('moveLeft')
def moveLeft(sid):
    global playerList
    playerList[sid].dirX = -1

@sio.on('moveRight')
def moveRight(sid):
    global playerList
    playerList[sid].dirX = 1

@sio.on('stopMoveUp')
def stopMoveUp(sid):
    global playerList
    playerList[sid].dirY = 0

@sio.on('stopMoveDown')
def stopMoveDown(sid):
    global playerList
    playerList[sid].dirY = 0

@sio.on('stopMoveLeft')
def stopMoveLeft(sid):
    global playerList
    playerList[sid].dirX = 0

@sio.on('stopMoveRight')
def stopMoveRight(sid):
    global playerList
    playerList[sid].dirX = 0

@sio.event
def disconnect(sid):
    global playerList
    playerList.pop(sid)
    sio.emit('remove', sid, 'players')

if __name__ == '__main__':
    t_move().thread.start()
    eventlet.wsgi.server(eventlet.listen(('200.235.91.143', 80)), app)
