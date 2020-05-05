'''
Created on 28 de abr de 2020

@author: leonardo

Content: Classe Bomba. 
'''
from componentes.jogo.objetos_dinamicos import ObjetosDinamicos
from componentes.jogo.thread_update import ThreadUpdate

class Bomba(ObjetosDinamicos):
    
    def __init__(self, timer, raio_bomba, posicao_final_x, posicao_final_y, dir_x, dir_y):
        self.timer = timer
        self.raio_bomba = raio_bomba
        self.posicao_final_x = posicao_final_x
        self.posicao_final_y = posicao_final_y
        self.dir_x = dir_x
        self.dir_y = dir_y
        
    def explodir(self):
        ThreadUpdate.bombas.popitem(self)
        