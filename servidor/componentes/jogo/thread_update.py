'''
Created on 28 de abr de 2020

@author: leonardo

'''

import threading
import time
from threading import Thread

class ThreadUpdate():

    personagens = dict()
    bombas = dict()

    def update_pesonagem(self):
        for personagem in self.personagens:
            personagem.posicao_x+=personagem.direcao_x*personagem.velocidade
            personagem.posicao_y+=personagem.direcao_y*personagem.velocidade

    def update_bomba(self):
        for bomba in self.bombas:
            bomba.timer-=1
            if(bomba.timer==0):
                bomba.explodir()
