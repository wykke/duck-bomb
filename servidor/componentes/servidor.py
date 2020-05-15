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




class Servidor():
    
    sio = socketio.Server()
    contador_bomba = 0
    contador = 0
    
    @sio.on('spawn')
    def spawn(sid, data):
        #Mandar mensagens depende da rede não acrescentar o delay de instanciar o objeto
        print(sid)
        print(data)
        Servidor.sio.enter_room(sid, 'players')
        x, y = ThreadUpdate.mapa.gerador_posicao()
        
        Servidor.sio.emit('spawn', {'id':sid, 'posX':x, 'posY':y,'tipo':"personagem", 'playerName':data}, 'players')
        
        #Cria o personagem e coloca na lista
        personagem = Personagem(sid, x, y, Servidor())
        
        ThreadUpdate.mapa.tiles[x][y] = sid
        ThreadUpdate.personagens.update({sid:personagem})
    
    @sio.on('placeBomb')
    def place_bomb(sid, posX, posY):
        global t

        #Recebe a posição de onde a bomba foi clicada
        Servidor.sio.emit('spawn', {'id':Servidor.contador, 'posX':posX, 'posY':posY,'tipo':"bomba"}, 'players')
        
        #Cria a bomba no servidor
        ThreadUpdate.personagens[sid].criar_bomba(posX, posY, Servidor.contador, t)
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
        self.sio.emit('explodirBomba', {'id':bomba.bid}, 'players')
    
    def remove(self, rid):
        print("Matar personagem Personagem")
        self.sio.emit('remove', {'id':rid}, 'players')
    

if __name__ == '__main__':
    
    #Valores iniciais para fazer o programa funcionar
    eventlet.monkey_patch()
    servidor = Servidor()
    '''servidor.spawn(10, "Robson")
    servidor.move(10, "0 0")
    
    servidor.spawn(11, "Cherobim")
    servidor.move(11, "0 0")'''
    
            
    

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
    servidor.place_bomb(10, "7 7")

    servidor.place_bomb(10, "33 34")
    time.sleep(0.3)
    servidor.place_bomb(10, "1 1")
    time.sleep(0.3)
    servidor.place_bomb(10, "38 39")
    
    while True:
        time.sleep(0.1)'''
      
    t = ThreadUpdate(servidor)
    app = socketio.WSGIApp(servidor.sio, static_files={'/': './client/'})
    eventlet.wsgi.server(eventlet.listen(('127.0.0.1', 8080)), app)
    
