'''
Created on 28 de abr de 2020

@author: leonardo

'''


import time
from componentes.jogo.mapa import Mapa
from threading import Thread


class ThreadUpdate(object):

    personagens = dict()
    bombas = dict()
    mapa = Mapa()
    
    def __init__(self):
        thread = Thread(target=self.run, args=())
        thread.daemon = True                            # Daemonize thread
        thread.start()                                  # Start the execution

    def run(self):
        while True:
            personagens = list(ThreadUpdate.personagens.values()).copy()
            for personagem in personagens:
                if(personagem.direcao_x or personagem.direcao_y):
                    print(personagem)
                    posicao_antiga_x = personagem.posicao_x
                    posicao_antiga_y = personagem.posicao_y
                    
                    personagem.posicao_x+=personagem.direcao_x*personagem.velocidade
                    personagem.posicao_y+=personagem.direcao_y*personagem.velocidade
                    
                    if(not ThreadUpdate.mapa.verfica(personagem.posicao_x, 
                                                     personagem.posicao_y)):
                        personagem.posicao_x = posicao_antiga_x
                        personagem.posicao_y = posicao_antiga_y
                    else:
                        ThreadUpdate.mapa.tiles[personagem.posicao_y][personagem.posicao_x] = 1
                        ThreadUpdate.mapa.tiles[posicao_antiga_x][posicao_antiga_y] = 0
                time.sleep(0.1)
    '''              
    @staticmethod
    def update_bomba(bomba):
        time.sleep(bomba.timer)
        bomba.explodir()
        del bomba
    '''