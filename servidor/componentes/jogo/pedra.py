'''
Created on 28 de abr de 2020

@author: leonardo
'''
from componentes.jogo.objetos_estaticos import ObjetosEstaticos

class Pedra(ObjetosEstaticos):
    def  __init__(self, tiles_x, tiles_y, destructible, oid, tipo):
        super().__init__( tiles_x, tiles_y, destructible, oid)
        self.tipo = tipo

    def destruir(self):
        pass

