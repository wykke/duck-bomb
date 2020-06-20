'''
Created on 28 de abr de 2020

@author: leonardo
'''

from componentes.jogo.arbusto import Arbusto
from componentes.jogo.pedra import Pedra
from random import randint
import json

TAM = 50

class Mapa():

      

    def __init__(self):
        global TAM
        self.contador_objetos = 0  
        self.tiles = [ [ 0 for i in range(TAM) ] for j in range(TAM) ] 

        for i in range(TAM):
            for j in range(TAM):
                #Insatanciando as bordas do mapa
                if(i==0 or j ==0 or i==TAM-1 or j == TAM-1):
                    self.tiles[i][j]= Pedra(i,j,False,self.contador_objetos,'pedra')
                    self.contador_objetos += 1 
        self.carrega_mapa() 

    def verifica(self, X, Y):
        global TAM
        
        if(self.tiles[X][Y]):
            return False
        else:
            return True
        
    def gerador_posicao(self):
        
        x = randint(1,48)
        y = randint(1,48)
        
        while(not self.verifica(x,y)):
            x = randint(1,48)
            y = randint(1,48)
            
        return (x,y)

    def carrega_mapa(self):
        arquivo = open('map.json',)

        data = json.load(arquivo)
        
        tipos = list(data.values())
        posicoes = list(data.keys())
        
        for i in range(len(tipos)):
            self.cria_objeto(tipos[i], posicoes[i])

        arquivo.close()
    
    def cria_objeto(self, tipo, posicao):
        x, y = map(int, posicao.split(','))

        if(tipo == '0'):
            self.tiles[x][y] = Arbusto(x,y,True, self.contador_objetos)
        elif(tipo == '1'):
            self.tiles[x][y]= Pedra(x,y,False, self.contador_objetos,'pedra')
        elif(tipo == '2'):
            self.tiles[x][y]= Pedra(x,y,False, self.contador_objetos,'parede1')
        elif(tipo == '3'):
            self.tiles[x][y]= Pedra(x,y,False, self.contador_objetos,'parede2')

        self.contador_objetos += 1