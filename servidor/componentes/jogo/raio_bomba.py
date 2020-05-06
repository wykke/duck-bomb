'''
Created on 28 de abr de 2020

@author: leonardo
Content: Power Up do Raio da Bomba.
'''
from componentes.jogo.powerups import PowerUp

class RaioBomba(PowerUp):

    def poder(self, personagem):
        personagem.raio_bomba+=0.5
