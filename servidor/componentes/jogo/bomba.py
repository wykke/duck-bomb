'''
Created on 28 de abr de 2020

@author: leonardo

Content: Classe Bomba. 
'''
from componentes.jogo.objetos_dinamicos import ObjetosDinamicos
from componentes.jogo.thread_update import ThreadUpdate
from componentes.jogo.arbusto import Arbusto
from componentes.jogo.pedra import Pedra


class Bomba(ObjetosDinamicos):
    
    def __init__(self, posicao_final_x, posicao_final_y, dono, bid, servidor):
        self.timer = dono.TIMER
        self.raio_bomba = dono.raio_bomba
        self.posicao_final_x = posicao_final_x
        self.posicao_final_y = posicao_final_y
        self.dir_x = dono.direcao_x
        self.dir_y = dono.direcao_y
        self.bid = bid
        self.dono = dono 
        self.servidor = servidor
        
    def destruir(self):

        for i in range(int(self.posicao_final_x - self.raio_bomba), 
                       int(self.posicao_final_x + self.raio_bomba), 1):
            for j in range(int(self.posicao_final_y - self.raio_bomba), 
                    int(self.posicao_final_y + self.raio_bomba), 1):
                 
                teste = ((i-self.posicao_final_x)**2 + (j-self.posicao_final_y)**2 )/self.raio_bomba**2
                
                
                
                if(teste <= 1):
                    if(i < 0 or j < 0 or i >= 50 or j >= 50):
                            continue
                    elif(not ThreadUpdate.mapa.verifica(i, j) and 
                       not((i == self.posicao_final_x) and (j == self.posicao_final_y))):
                        elemento = ThreadUpdate.mapa.tiles[i][j]
                        print(str(elemento) + str((i,j)))
                        if(isinstance(elemento, str)):
                            personagem = ThreadUpdate.personagens[elemento]
                            personagem.destruir()
                        elif(not isinstance(elemento, Arbusto)):
                            elemento.destruir()
                        else:
                            elemento.destruir(self.dono)
                                
                        if(not isinstance(elemento, Pedra)):
                            ThreadUpdate.mapa.tiles[i][j] = 0
        
        
