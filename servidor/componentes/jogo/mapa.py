'''
Created on 28 de abr de 2020

@author: leonardo
'''

class Mapa():
    TAM = 50

    def __init__(self):
        tiles[TAM][TAM]

        for i in range(TAM):
            for j in range(TAM):
                tiles[i][j]=0
                #Insatanciando as bordas do mapa
                if(i==0 or j ==0 or i==TAM-1 or j == TAM-1):
                    tiles[i][j]=Pedra()

        tiles[10][10]=Arbusto()
        tiles[20][10]=Arbusto()
        tiles[20][20]=Arbusto()
        tiles[10][30]=Arbusto()
        tiles[30][20]=Arbusto()
        tiles[40][10]=Arbusto()
        tiles[10][40]=Arbusto()

    def verfica(self, X, Y):
        if(tiles[X][Y]):
            return false
        else:
            return true
