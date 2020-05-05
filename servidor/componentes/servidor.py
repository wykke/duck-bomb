'''
Created on 28 de abr de 2020

@author: leonardo

Content: Classe Servidor. Usando Padrao de nome python PEP8.
'''
import eventlet
import socketio
import threading
import time

from componentes.jogo.thread_update import ThreadUpdate
from componentes.jogo.personagem import Personagem
from eventlet.green.profile import thread
from gi.overrides.keysyms import target




DEFAULT_POSTION = 33


class Servidor():
    
    sio = socketio.Server()
    
    @sio.on('spawn')
    def spawn(self, sid, data):
        
        #print(data)
        
        #Mandar mensagens depende da rede não acrescentar o delay de instanciar o objeto
        self.sio.enter_room(sid, 'players')
        self.sio.emit('spawn', {'id':sid, 'x':DEFAULT_POSTION, 'y':DEFAULT_POSTION}, 'players')
        
        #Cria o personagem e coloca na lista
        personagem = Personagem(sid, DEFAULT_POSTION, DEFAULT_POSTION)
        ThreadUpdate.personagens.update({sid:personagem})
        
 
    @sio.on('gameover')
    def game_over(self, sid):
        
        #Infoma por mensagem que um player saiu do jogo 
        self.sio.emit('remove', sid, 'players')
        
        #Remove um objeto de uma lista de manipulação 
        personagem = ThreadUpdate.personagens.pop(sid)
        
        #Destroi o objeto para aliviar a memória
        del personagem
        
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
        
        #Retira a bomba da lista de atualização 
        bomb = ThreadUpdate.bombas.pop((x,y))
        
        #Destroi o objeto bomba para liberar espaço 
        del bomb
    
    @sio.on('place')
    def place_bomb(self, sid, data):
        
        #Recebe a posição de onde a bomba foi clicada
        x, y = map(int, data.split())
        self.sio.emit('place', {'id':sid, 'x':x, 'y':y}, 'players')
        
        #Cria a bomba no servidor
        if ThreadUpdate.personagens[sid].criar_bomba(x,y):
            self.explode(x, y)


if __name__ == '__main__':
    
    #Valores iniciais para fazer o programa funcionar
    eventlet.monkey_patch()
    servidor = Servidor()
    
    servidor.spawn(10, "Robson")
    servidor.move(10, "0 0")
    
    
    t= ThreadUpdate()
    
    print("Saiu da thread")
    
    servidor.spawn(11, "Claudio")
    servidor.move(11, "1 1")
    
    
    
    
    while True:
        print(ThreadUpdate.personagens[10].posicao_x)
        print(ThreadUpdate.personagens[11].posicao_y)
        time.sleep(0.5)
        
    #app = socketio.WSGIApp(servidor.sio, static_files={})
    #eventlet.wsgi.server(eventlet.listen(('127.0.0.1', 8080)), app)
    