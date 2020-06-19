'''
Created on 28 de abr de 2020

@author: leonardo

Content: Classe do Power Up de Multiplas Bombas.

'''
from componentes.jogo.powerups import PowerUp

class MultiBomba(PowerUp):

    def poder(self, personagem):
        personagem.count_bomba += 1
        personagem.servidor.emitPoder("multibomba", personagem.count_bomba-1, personagem.sid)
