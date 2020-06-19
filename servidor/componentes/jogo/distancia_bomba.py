'''
Created on 28 de abr de 2020

@author: leonardo

Content: Power Up de aumentar a distancia limite do raio da bomba.
'''
from componentes.jogo.powerups import PowerUp
import math



class DistanciaBomba(PowerUp):

    def poder(self, personagem):
        personagem.distancia_bomba+=0.5
        personagem.servidor.emitPoder("arremesso", math.floor((personagem.distancia_bomba-3)/0.5), personagem.sid)
