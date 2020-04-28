'''
Created on 28 de abr de 2020

@author: leonardo

Content: Classe Personagem
'''
from componentes.jogo.objetos_dinamicos import ObjetosDinamicos

class Personagem(ObjetosDinamicos):
    
    def __init__(self, id, direcao_x, direcao_y,
                 raio_bomba, count_bomba,
                 distancia_bomba, angulo_bomba):
        self.id = id
        self.direcao_x = direcao_x
        self.direcao_y = direcao_y
        self.raio_bomba = raio_bomba
        self.count_bomba = count_bomba
        self.distancia_bomba = distancia_bomba
        self.angulo_bomba = angulo_bomba
        
    def criar_bomba(self, x, y):
        pass
    
    def andar(self, x, y):
        pass
    
    def parar_andar(self):
        pass