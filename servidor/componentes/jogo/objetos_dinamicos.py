'''
Created on 28 de abr de 2020

@author: leonardo

Content: Classe Objetos dinamicos
'''

from abc import ABC, abstractmethod

class ObjetosDinamicos(ABC):

    def __init__(self, posicao_x, posicao_y, velocidade=1):
        self.posicao_x = posicao_x
        self.posicao_y = posicao_y
        self.velocidade = velocidade
