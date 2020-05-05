'''
Created on 28 de abr de 2020

@author: leonardo

Content: Classe Arbusto
'''
from componentes.jogo.objetos_estaticos import ObjetosEstaticos
import random
'''
from componentes.jogo.distancia_bomba import DistanciaBomba
from componentes.jogo.multi_bomba import MultiBomba
from componentes.jogo.raio_bomba import RaioBomba
from componentes.jogo.velocidade import Velocidade
'''
class Arbusto(ObjetosEstaticos):
    
    pass
    '''def destruir(self, id):
        #Seleciona um poder
        objeto = self.is_power()
        
        if (objeto != None):
            #Aplica o poder
            objeto.power(id)
            
            #Apaga o objeto que foi usado para fazer o poder
            del objeto

#Estas dudas funções podem virar uma só, mas precisamos passar o id para onde o poder vai...
       
    def is_power(self):
        
        r = random.randint(0,20)
        
        #Switch implementado com dicionário 
        switcher = {
            1: Velocidade(),
            2: RaioBomba(),
            3: DistanciaBomba(),
            4: MultiBomba()
        }
        
        #Escolher qual construtor será usado 
        objeto = switcher.get(r, lambda: None)
        
        return objeto
       ''' 
