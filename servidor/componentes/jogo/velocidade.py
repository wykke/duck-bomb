'''
Created on 28 de abr de 2020

@author: leonardo
Content: Classe do PoweUp de Velocidade
'''
from componentes.jogo.powerups import PowerUp

class Velocidade(PowerUp):

    def poder(self,id):
        ThreadUpdade.personagens[id].velocidade+=0.3
