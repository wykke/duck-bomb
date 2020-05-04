'''
Created on 28 de abr de 2020

@author: leonardo

Content: Classe do Power Up de Multiplas Bombas.

'''
from componentes.jogo.powerups import PowerUp
from componentes.jogo.thread_update import ThreadUpdate

class MultiBomba(PowerUp):

    def poder(self,id):
        ThreadUpdate.personagens[id].count_bomba+=1
