'''
Created on 28 de abr de 2020

@author: leonardo

Content: Power Up de aumentar a distancia limite do raio da bomba.
'''
from componentes.jogo.powerups import PowerUp


class DistanciaBomba(PowerUp):

    def poder(self,id):
        ThreadUpdade.personagens[id].distancia_bomba+=0.5
