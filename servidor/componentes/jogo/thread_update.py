'''
Created on 28 de abr de 2020

@author: leonardo

'''


import time
from componentes.jogo.mapa import Mapa
from threading import Thread, Lock


class ThreadUpdate(object):

    lock = Lock()
    personagens = dict()
    threads = list()
    mapa = Mapa()
    
    def __init__(self):
        thread_personagens = Thread(target= self.run, args=())
        thread_personagens.daemon = True                     
        thread_personagens.start()
        ThreadUpdate.threads.append(thread_personagens)
        #thread_personagens.join()

    
    def place_bomb(self, bomba):
        thread_bomba = Thread(target= self.update_bomba, args=(bomba,))
        thread_bomba.start()
        ThreadUpdate.threads.append(thread_bomba)
        #thread_bomba.join()
        
    def run(self):
        while True:
            
            personagens = list(ThreadUpdate.personagens.values()).copy()
            
            ThreadUpdate.lock.acquire()
            for personagem in personagens:
                print(personagem)
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
                        ThreadUpdate.mapa.tiles[personagem.posicao_y][personagem.posicao_x] = personagem.sid
                        ThreadUpdate.mapa.tiles[posicao_antiga_x][posicao_antiga_y] = 0 
                time.sleep(0.1)
            ThreadUpdate.lock.release()
            time.sleep(0.2)

    def update_bomba(self, bomba):
        time.sleep(bomba.timer)
        ThreadUpdate.lock.acquire()
        bomba.destruir()
        ThreadUpdate.lock.release()
        print(time.clock(), end=" ")
        print("Explodiu bomba...")
        del bomba
    