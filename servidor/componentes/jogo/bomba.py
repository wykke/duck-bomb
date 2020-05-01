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

    def bomba(self, posicao_final_x, posicao_final_y, distancia_bomba, raio_bomba, angulo):
        pass

    def explodir(self):
        ThreadUpdate.bombas.remove(self)
        tilesX=self.posicao_final_x/20
        tilesY=self.posicao_final_y/20
        for i in range(tilesX):
            for j in range(tilesY):
                if(Mapa.tiles[tilesX][tilesY].destructible):
                    # se puder ser distruido é um arbusto, portanto ver ser dropa um powerUp
                for id in range(ThreadUpdade.personagens)
                    if((ThreadUpdade.personagens[id].poricao_x == tilesX) and (ThreadUpdade.personagens[id].poricao_y == tilesY)):
                        Servidor.gameOver(id)
        #Explodir tudo que há no raio da bomba
        #Se tem um personagem tem que dar gameOver
        #se tem um arbusto tem que ver se ele vai gerar um PowerUp
