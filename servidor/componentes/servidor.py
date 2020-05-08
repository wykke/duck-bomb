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
        
 
    @sio.on('gameover')
    def game_over(self, sid):
        
        #Infoma por mensagem que um player saiu do jogo 
        self.sio.emit('remove', sid, 'players')
        
        #Remove um objeto de uma lista de manipulação 
        personagem = ThreadUpdate.personagens[sid]
        
        #Destroi o objeto para aliviar a memória
        personagem.destruir()
        
    @sio.on('move')
    def move(self, sid, data):
        
        #Recebe a direção de x e y
        direcao_x, direcao_y = map(int, data.split())
        
        #Atualiza as direções e acaba
        ThreadUpdate.personagens[sid].direcao_x = direcao_x
        ThreadUpdate.personagens[sid].direcao_y = direcao_y

 
    def explode(self, x, y):

        #Emite a posição de onde a bomba foi clicada
        self.sio.emit('explode', {'x':x, 'y':y}, 'players')
        
    
    @sio.on('place')
    def place_bomb(self, sid, data):
        
        global t
        
        #Recebe a posição de onde a bomba foi clicada
        x, y = map(int, data.split())
        self.sio.emit('place', {'id':sid, 'x':x, 'y':y}, 'players')
        
        #Cria a bomba no servidor
        if ThreadUpdate.personagens[sid].criar_bomba(x,y,t):
            self.explode(x, y)


if __name__ == '__main__':
    
    #Valores iniciais para fazer o programa funcionar
    eventlet.monkey_patch()
    servidor = Servidor()
    servidor.spawn(10, "Robson")
    servidor.move(10, "0 0")
    
    servidor.spawn(11, "Cherobim")
    servidor.move(11, "0 0")
    
            
    t = ThreadUpdate()
    

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
    