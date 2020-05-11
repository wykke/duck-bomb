'''
Created on 28 de abr de 2020

@author: leonardo

Content: Classe Servidor. Usando Padrao de nome python PEP8.
'''
import eventlet
import socketio
import time

from componentes.jogo.thread_update import ThreadUpdate
from componentes.jogo.personagem import Personagem
from componentes.jogo import personagem




class Servidor():
    
    sio = socketio.Server()
    contador_bomba = 0
    
    @sio.on('spawn')
    def spawn(self, sid, data):
        #Mandar mensagens depende da rede não acrescentar o delay de instanciar o objeto
        self.sio.enter_room(sid, 'players')
        x, y = ThreadUpdate.mapa.gerador_posicao()
        
        self.sio.emit('spawn', {'id':sid, 'x':x, 'y':y}, 'players')
        
        #Cria o personagem e coloca na lista
        personagem = Personagem(sid, x, y)
        
        ThreadUpdate.mapa.tiles[x][y] = sid
        ThreadUpdate.personagens.update({sid:personagem})
    
    @sio.on('placeBomb')
    def place_bomb(self, sid, data):
        global t

        #Recebe a posição de onde a bomba foi clicada
        x, y = map(int, data.split())
        self.sio.emit('spawn', {'id':sid, 'x':x, 'y':y}, 'players')
        
        #Cria a bomba no servidor
        ThreadUpdate.personagens[sid].criar_bomba(x, y, self.contador, 
                                                  t)
        self.contador += 1
        if(self.contador > 100):
            self.contador = 0
            
    @sio.on('move')
    def move(self, sid, data):
        #Recebe a direção de x e y
        direcao_x, direcao_y = map(int, data.split())
        
        #Atualiza as direções e acaba
        ThreadUpdate.personagens[sid].direcao_x = direcao_x
        ThreadUpdate.personagens[sid].direcao_y = direcao_y
        
        if(direcao_x == 0 and direcao_y == 0):
            self.sio.emit('stopMove', {'id':sid}, 'players')
 
    def game_over(self, sid):
        #Infoma por mensagem que um player saiu do jogo 
        self.sio.emit('remove', {'id':sid}, 'players')
        
        #Remove um objeto de uma lista de manipulação 
        personagem = ThreadUpdate.personagens[sid]
        
        #Destroi o objeto para aliviar a memória
        personagem.destruir()
        
    def emit_move(self, sid, x, y):
        self.sio.emit('move', {'id':sid, 'x':x, 'y':y}, 'players')
        
    def explode(self, bomba):
        #Emite a posição de onde a bomba foi clicada
        self.sio.emit('explodirBomba', {'id':bomba.bid}, 'players')
    
    def remove(self, rid):
        self.sio.emit('remove', {'id':rid}, 'players')
    

if __name__ == '__main__':
    
    #Valores iniciais para fazer o programa funcionar
    eventlet.monkey_patch()
    servidor = Servidor()
    servidor.spawn(10, "Robson")
    servidor.move(10, "0 0")
    
    servidor.spawn(11, "Cherobim")
    servidor.move(11, "0 0")
    
            
    t = ThreadUpdate(servidor)
    

    '''for i in range(11):
        servidor.spawn(i+11, "Claudio")
        servidor.move(i+11, "1 1")
        for j in range(50):
            for k in range(50):
                print(ThreadUpdate.mapa.tiles[j][k], end = " ")
            print()
            
        time.sleep(0.5)
    
    for i in range(11):
        personagem = ThreadUpdate.personagens[i+11]
        personagem.destruir()
        time.sleep(0.5)

    print(time.clock(), end =" ")
    servidor.place_bomb(10, "5 5")
    servidor.place_bomb(10, "21 21")
    time.sleep(0.5)
    servidor.place_bomb(10, "7 7")'''

    servidor.place_bomb(10, "33 34")
    time.sleep(0.3)
    servidor.place_bomb(10, "1 1")
    time.sleep(0.3)
    servidor.place_bomb(10, "38 39")
    
    while True:
        time.sleep(0.1)
      
        
    #app = socketio.WSGIApp(servidor.sio, static_files={})
    #eventlet.wsgi.server(eventlet.listen(('127.0.0.1', 8080)), app)
    