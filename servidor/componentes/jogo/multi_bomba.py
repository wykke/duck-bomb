'''
Created on 28 de abr de 2020

@author: leonardo

Content: Classe do Power Up de Multiplas Bombas.

'''
from componentes.jogo.powerups import PowerUp

class MultiBomba(PowerUp):

    def poder(self,id):
        ThreadUpdade.personagens[id].count_bomba+=1
