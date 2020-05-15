'''
Created on 28 de abr de 2020

@author: leonardo

Content: Classe Personagem
'''
from componentes.jogo.objetos_dinamicos import ObjetosDinamicos
from componentes.jogo.bomba import Bomba
from componentes.jogo.thread_update import ThreadUpdate

import math

class Personagem(ObjetosDinamicos):
    #Constante de tempo.
    TIMER = 1.0

    def __init__(self, sid, posicao_x, posicao_y, servidor,
                 direcao_x = 0, direcao_y = 0,
                 raio_bomba = 10, count_bomba = 1,
                 distancia_bomba = 1, angulo_bomba = 0):

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

    def criar_bomba(self, x, y, bid, t):
        #Calcula a posição final da bomba
        self.angulo_bomba = math.atan(y/x)
        posicao_final_x = x #int(self.raio_bomba*math.cos(self.angulo_bomba))
        posicao_final_y = y #int(self.raio_bomba*math.sin(self.angulo_bomba))

        
        bomba = Bomba(posicao_final_x, posicao_final_y, self, bid, self.servidor)
        t.place_bomb(bomba)
        
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