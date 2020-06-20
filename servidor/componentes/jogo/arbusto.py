'''
Created on 28 de abr de 2020

@author: leonardo

Content: Classe Arbusto
'''
from componentes.jogo.objetos_estaticos import ObjetosEstaticos
import random

from componentes.jogo.distancia_bomba import DistanciaBomba
from componentes.jogo.multi_bomba import MultiBomba
from componentes.jogo.raio_bomba import RaioBomba
from componentes.jogo.velocidade import Velocidade
import time
from threading import Thread

class Arbusto(ObjetosEstaticos):
    
    def destruir(self, personagem):
        #Seleciona um poder
        objeto = self.is_power()
        if (objeto != None):
            print("Aplica o poder")
            objeto.poder(personagem)
            #Apaga o objeto que foi usado para fazer o poder
            del objeto
        personagem.servidor.remove(self.oid)
        respawn = Thread(target= self.re_spawn, args=(personagem,))
        respawn.start()

#Estas dudas funções podem virar uma só, mas precisamos passar o id para onde o poder vai...
       
    def is_power(self):
        
        r = random.randint(0,5)
        
        #Switch implementado com dicionário 
        switcher = {
            0: Velocidade(),
            1: RaioBomba(),
            2: DistanciaBomba(),
            3: MultiBomba()
        }
        
        #Escolher qual construtor será usado
        if (r <= 3):
            objeto = switcher.get(r, lambda: None)
            return objeto
        else:
            return None

    def re_spawn(self, personagem):
        time.sleep(15)
        personagem.servidor.respawn(self)

        
