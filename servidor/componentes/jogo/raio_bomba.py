'''
Created on 28 de abr de 2020

@author: leonardo
Content: Powe Up do Raio da Bomba.
'''
from componentes.jogo.powerups import PowerUp
from componentes.jogo.thread_update import ThreadUpdate

def RaioBomba(PowerUp):

    def poder(self,id):
        ThreadUpdate.personagens[id].raio_bomba+=0.5
