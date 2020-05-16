'''
Created on 28 de abr de 2020

@author: leonardo

'''


import time
from componentes.jogo.mapa import Mapa
from threading import Thread, Lock
from componentes.jogo.arbusto import Arbusto


class ThreadUpdate(object):

    lock = Lock()
    personagens = dict()
    threads = list()
    mapa = Mapa()
    
    def __init__(self, servidor):
        self.servidor = servidor
        thread_personagens = Thread(target= self.run, args=())
        thread_personagens.daemon = True                     
        thread_personagens.start()
        ThreadUpdate.threads.append(thread_personagens)
        #thread_personagens.join()

    
    def place_bomb(self, bomba):
        thread_bomba = Thread(target= self.update_bomba, args=(bomba,))
        thread_bomba.start()
        ThreadUpdate.threads.append(thread_bomba)
        
    def run(self):
        time.sleep(0.5)
        contador = 0
        arbustos = [(10,10),(20,10),(20,20),(10,30),(30,20),(40,10),(10,40)]
        
        while True:
            
            personagens = list(ThreadUpdate.personagens.values()).copy()
            
            if(contador == 50):
                contador = 0
                for arbusto in arbustos:
                    x,y = arbusto
                    ThreadUpdate.mapa.tiles[x][y] = Arbusto(x,y,True)
                
            ThreadUpdate.lock.acquire()
            for personagem in personagens:
                
                if(personagem.direcao_x or personagem.direcao_y):
                    posicao_antiga_x = personagem.posicao_x
                    posicao_antiga_y = personagem.posicao_y
                    
                    personagem.posicao_x += personagem.direcao_x*personagem.velocidade
                    personagem.posicao_y += personagem.direcao_y*personagem.velocidade
                    
                    if(not ThreadUpdate.mapa.verfica(personagem.posicao_x, 
                                                     personagem.posicao_y)):
                        personagem.posicao_x = posicao_antiga_x
                        personagem.posicao_y = posicao_antiga_y
                    else:
                        ThreadUpdate.mapa.tiles[personagem.posicao_x][personagem.posicao_y] = personagem.sid
                        ThreadUpdate.mapa.tiles[posicao_antiga_x][posicao_antiga_y] = 0 
                        
                self.servidor.emit_move(personagem.sid, personagem.posicao_x, personagem.posicao_y)
                
            ThreadUpdate.lock.release()
            contador += 1
            time.sleep(0.025)

    def update_bomba(self, bomba):
        time.sleep(bomba.timer)
        ThreadUpdate.lock.acquire()
        bomba.destruir()
        ThreadUpdate.lock.release()
        print(time.clock(), end=" ")
        print("Explodiu bomba...")
        self.servidor.explode(bomba)
        del bomba
    
