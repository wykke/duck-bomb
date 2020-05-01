'''
Created on 28 de abr de 2020

@author: leonardo
'''
from reportlab.graphics.barcode.widgets import BarcodeECC200DataMatrix
from componentes.jogo.arbusto import Arbusto
from componentes.jogo.pedra import Pedra
TAM = 50

class Mapa():
    

    def __init__(self):
        global TAM
        
        tiles = [ [ 0 for i in range(TAM) ] for j in range(TAM) ] 

        for i in range(TAM):
            for j in range(TAM):
                #Insatanciando as bordas do mapa
                if(i==0 or j ==0 or i==TAM-1 or j == TAM-1):
                    tiles[i][j]=Pedra()

        self.tiles[10][10]=Arbusto()
        self.tiles[20][10]=Arbusto()
        self.tiles[20][20]=Arbusto()
        self.tiles[10][30]=Arbusto()
        self.tiles[30][20]=Arbusto()
        self.tiles[40][10]=Arbusto()
        self.tiles[10][40]=Arbusto()

    def verfica(self, X, Y):
        if(self.tiles[X][Y]):
            return False
        else:
            return True
