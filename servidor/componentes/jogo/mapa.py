'''
Created on 28 de abr de 2020

@author: leonardo
'''

from componentes.jogo.arbusto import Arbusto
from componentes.jogo.pedra import Pedra
from random import randint

TAM = 50

class Mapa():
    

    def __init__(self):
        global TAM
        
        self.tiles = [ [ 0 for i in range(TAM) ] for j in range(TAM) ] 

        for i in range(TAM):
            for j in range(TAM):
                #Insatanciando as bordas do mapa
                if(i==0 or j ==0 or i==TAM-1 or j == TAM-1):
                    self.tiles[i][j]= Pedra(i,j,False)

        self.tiles[10][10]=Arbusto(10,10,True)
        self.tiles[20][10]=Arbusto(20,10,True)
        self.tiles[20][20]=Arbusto(20,20,True)
        self.tiles[10][30]=Arbusto(10,30,True)
        self.tiles[30][20]=Arbusto(30,20,True)
        self.tiles[40][10]=Arbusto(40,10,True)
        self.tiles[10][40]=Arbusto(10,40,True)

    def verfica(self, X, Y):
        global TAM
        
        if(self.tiles[X][Y]):
            return False
        else:
            return True
        
    def gerador_posicao(self):
        
        x = randint(1,48)
        y = randint(1,48)
        
        while(not self.verfica(x,y)):
            x = randint(1,48)
            y = randint(1,48)
            
        return (x,y)