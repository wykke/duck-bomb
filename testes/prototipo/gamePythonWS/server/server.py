import asyncio
import websockets
import time
import threading

players = 0 


class Player:
    def __init__(self, id, x = 0, y = 0, speed = 5):
        self.id = id
        self.x = x
        self.y = y 
        self.dirX = 0
        self.dirY = 0 
        self.speed = speed
        print("Player criado com sucesso!")
    
    def setX(self, x):
        self.x = x
    
    def setY(self, y):
        self.y = y
    
    def getX(self):
        return self.x
    
    def getY(self):
        return self.y


async def hello(websocket, path):
    global players
    jogador = Player(players, 500, 500)
    
    async def moveUP():
        while 1:
            jogador.setY(jogador.getY()-jogador.speed)
            websocket.send("move:"+str(jogador.id)+":"+ str(jogador.getX())+":"+str(jogador.getY()))
            print("move:"+str(jogador.id)+":"+ str(jogador.getX())+":"+str(jogador.getY()))
            time.sleep(1)
    
    async def moveR():
        while 1:
            jogador.setX(jogador.getX()+jogador.speed)
            await websocket.send("move:"+str(jogador.id)+":"+ str(jogador.getX())+":"+str(jogador.getY()))
            print("move:"+str(jogador.id)+":"+ str(jogador.getX())+":"+str(jogador.getY()))
            time.sleep(1)

    def threadEvoque():
        global players
        loop = asyncio.new_event_loop()
        task = loop.create_task(moveUP())
        loop.run_until_complete(task)
        players += 1 
        print(players)
    
    def threadEvoque2():
        global players
        loop = asyncio.new_event_loop()
        task2 = loop.create_task(moveR())
        loop.run_until_complete(task2)
        players += 1 
        print(players)
    
    while 1:
        msg = await websocket.recv()
        print(msg)
        if(msg == "start"):
            players +=1
            await websocket.send("spawn:"+str(players)+":"+ str(jogador.getX())+":"+str(jogador.getY()))
            print("spawn:"+str(players)+":"+ str(jogador.getX())+":"+str(jogador.getY()))

        
            
            
            




start_server = websockets.serve(hello, "0.0.0.0", 8888)
print("Iniciando server...")
asyncio.get_event_loop().run_until_complete(start_server)
print("Sever em funcionamento!")
asyncio.get_event_loop().run_forever()
