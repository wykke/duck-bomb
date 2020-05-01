'''
Created on 28 de abr de 2020

@author: leonardo
Content: Classe Objetos estáticos.
'''

from abc import ABC, abstractmethod

class ObjetosEstaticos(ABC):

    def __init__(self, tiles_x, tiles_y, destructible):
        self.tiles_x = tiles_x
        self.tiles_y = tiles_y
        self.destructible = destructible
