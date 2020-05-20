'''
Created on 28 de abr de 2020

@author: leonardo

Content: Classe Personagem
'''
from componentes.jogo.objetos_dinamicos import ObjetosDinamicos
from componentes.jogo.bomba import Bomba
from componentes.jogo.thread_update import ThreadUpdate

import math
from math import pi
from componentes.jogo import distancia_bomba

class Personagem(ObjetosDinamicos):
    #Constante de tempo.
    TIMER = 0.4

    def __init__(self, sid, posicao_x, posicao_y, servidor, nome,
                 direcao_x = 0, direcao_y = 0, 
                 raio_bomba = 2, count_bomba = 1,
                 distancia_bomba = 3, angulo_bomba = 0):

        #Chama o construtor da classe mãe
        super().__init__(posicao_x, posicao_y)
        self.servidor = servidor
        self.sid = sid
        self.direcao_x = direcao_x
        self.direcao_y = direcao_y
        self.raio_bomba = raio_bomba
        self.count_bomba = count_bomba
        self.distancia_bomba = distancia_bomba
        self.angulo_bomba = angulo_bomba
        self.nome = nome

    def criar_bomba(self, x, y, bid, t):
        #Calcula a posição final da bomba
        
        if((x-self.posicao_x)**2 + (y-self.posicao_y)**2 < self.distancia_bomba**2):
            posicao_final_x = x
            posicao_final_y = y
        else:
            self.angulo_bomba = math.atan2((x-self.posicao_x),(y-self.posicao_y))
            posicao_final_x = self.posicao_x + round(self.distancia_bomba*math.sin(self.angulo_bomba))
            posicao_final_y = self.posicao_y + round(self.distancia_bomba*math.cos(self.angulo_bomba))

        
        bomba = Bomba(posicao_final_x, posicao_final_y, self, bid, self.servidor)
        t.place_bomb(bomba)
        
        return (posicao_final_x, posicao_final_y)
        
    def andar(self, x, y):
        self.direcao_x = x
        self.direcao_y = y

    def parar_andar(self):
        self.direcao_x = 0
        self.direcao_y = 0
    
    def destruir(self):
        self.servidor.remove(self.sid)
        personagem = ThreadUpdate.personagens.pop(self.sid)
        ThreadUpdate.mapa.tiles[personagem.posicao_x][personagem.posicao_y] = 0
        del personagem
