'''
Created on 28 de abr de 2020

@author: leonardo

Content: Classe Servidor. Usando Padrao de nome python PEP8.
'''

from componentes.jogo.thread_update import ThreadUpdate
from componentes.jogo.personagem import Personagem

import eventlet
import socketio
import threading
import time
from threading import Thread

DEFAULT_POSTION = 250

def Servidor():
    
    @sio.on('spawn')
    def spawn(self, sid):
        
        #Mandar mensagens depende da rede não acrescentar o delay de instanciar o objeto
        sio.enter_room(sid, 'players')
        sio.emit('spawn', {'id':sid, 'x':DEFAULT_POSTION, 'y':DEFAULT_POSTION}, 'players')
        
        #Cria o personagem e coloca na lista
        personagem = Personagem(sid, DEFAULT_POSTION, DEFAULT_POSTION)
        ThreadUpdate.personagens.update({sid:personagem})
        
 
    @sio.on('gameover')
    def game_over(self, sid):
        
        #Infoma por mensagem que um player saiu do jogo 
        sio.emit('remove', sid, 'players')
        
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
        
    @sio.on('explode')    
    def explode(self, sid, data):
        
        #Recebe a posição de onde a bomba foi clicada
        x, y = map(int, data.split())
        sio.emit('explode', {'id':sid, 'x':x, 'y':y}, 'players')
        
        #Retira a bomba da lista de atualização 
        bomb = ThreadUpdate.bombas.pop((x,y))
        
        #Destroi o objeto bomba para liberar espaço 
        del bomb
    
    @sio.on('place')
    def place_bomb(self, sid, data):
        
        #Recebe a posição de onde a bomba foi clicada
        x, y = map(int, data.split())
        sio.emit('place', {'id':sid, 'x':x, 'y':y}, 'players')
        
        #Cria a bomba no servidor
        ThreadUpdate.personagens[sid].criar_bomba(x,y)


if __name__ == '__main__':
    
    #Valores iniciais para fazer o programa funcionar
    eventlet.monkey_patch()
    sio = socketio.Server()
    Servidor()
     