# -*- coding: utf-8 -*-
'''
Created on 28 de abr de 2020

@author: leonardo

Content: Classe Servidor. Usando Padrao de nome python PEP8.
'''
import sys
sys.path.append("..")
import eventlet
import socketio
import time

from componentes.jogo.thread_update import ThreadUpdate
from componentes.jogo.personagem import Personagem
from componentes.jogo.pedra import Pedra
from componentes.jogo.arbusto import Arbusto



class Servidor():
    
    sio = socketio.Server()
    contador = 0
    
    @sio.on('spawn')
    def spawn(sid, data):
        #Mandar mensagens depende da rede não acrescentar o delay de instanciar o objeto
        Servidor.sio.enter_room(sid, 'players')
        x, y = ThreadUpdate.mapa.gerador_posicao()
        
        Servidor.sio.emit('spawn', {'id':sid, 'posX':x, 'posY':y,'tipo':"personagem", 'playerName':data}, 'players')
        for i in range(50):
            for j in range(50):
                if(isinstance(ThreadUpdate.mapa.tiles[i][j], Pedra)):
                    Servidor.sio.emit('spawn', {'id':ThreadUpdate.mapa.tiles[i][j].oid, 'posX':i, 'posY':j,'tipo':"pedra"}, sid)
                elif(isinstance(ThreadUpdate.mapa.tiles[i][j], Arbusto)):
                    Servidor.sio.emit('spawn', {'id':ThreadUpdate.mapa.tiles[i][j].oid, 'posX':i, 'posY':j,'tipo':"arbusto"}, sid)

        for p in ThreadUpdate.personagens.values():
            Servidor.sio.emit('spawn', {'id':p.sid, 'posX':p.posicao_x, 'posY':p.posicao_y,'tipo':"personagem", 'playerName':p.nome}, sid)
        #Cria o personagem e coloca na lista
        personagem = Personagem(sid, x, y, Servidor(), data)
        
        ThreadUpdate.mapa.tiles[x][y] = sid
        ThreadUpdate.personagens.update({sid:personagem})
    
    @sio.on('placeBomb')
    def place_bomb(sid, posX, posY):
        global t

        #Recebe a posição de onde a bomba foi clicada
        #Cria a bomba no servidor
        if sid in ThreadUpdate.personagens:
            x, y = ThreadUpdate.personagens[sid].criar_bomba(posX, posY, Servidor.contador, t)
        else:
            return 
        if(x > 0 and y > 0):
            Servidor.sio.emit('spawn', {'id':Servidor.contador, 'posX':x, 'posY':y,'tipo':"bomba", 'playerName': sid}, 'players')
            Servidor.contador += 1
            if(Servidor.contador > 100):
                Servidor.contador = 0
            
    @sio.on('move')
    def move(sid, direcao_x, direcao_y):
        #Recebe a direção de x e y
     
        
        #Atualiza as direções e acaba
        ThreadUpdate.personagens[sid].direcao_x = direcao_x
        ThreadUpdate.personagens[sid].direcao_y = direcao_y
        
        if(direcao_x == 0 and direcao_y == 0):
            Servidor.sio.emit('stopMove', {'id':sid}, 'players')
    
    @sio.event
    def disconnect(sid):
        personagem = ThreadUpdate.personagens.pop(sid)
        personagem.servidor.remove(sid)
        del personagem
 
    def game_over(self, sid):
        #Infoma por mensagem que um player saiu do jogo 
        self.sio.emit('remove', {'id':sid}, 'players')
        
        #Remove um objeto de uma lista de manipulação 
        personagem = ThreadUpdate.personagens[sid]
        
        #Destroi o objeto para aliviar a memória
        personagem.destruir()
        
    def emit_move(self, sid, x, y):
        self.sio.emit('move', {'id':sid, 'posX':x, 'posY':y}, 'players')
        
    def explode(self, bomba):
        #Emite a posição de onde a bomba foi clicada
        self.sio.emit('explodirBomba', {'id':bomba.bid, 'tamanho':bomba.raio_bomba}, 'players')
    
    def remove(self, rid):
        self.sio.emit('remove', {'id':rid}, 'players')

    def emitPoder(self, tipo, qtd, sid):
        self.sio.emit('powerUp',{'tipo':tipo, 'qtd':qtd}, room=sid)
        print("poder",tipo,qtd,sid)
    

if __name__ == '__main__':
    
    #Valores iniciais para fazer o programa funcionar
    eventlet.monkey_patch()
    servidor = Servidor()
      
    t = ThreadUpdate(servidor)
    app = socketio.WSGIApp(servidor.sio, static_files={'/': './client/'})
    eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 12376)), app)
    
