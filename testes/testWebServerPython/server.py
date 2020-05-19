import eventlet
import socketio

sio = socketio.Server()

app = socketio.WSGIApp(sio, static_files={
    '/': './client/'
})


if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('127.0.0.1', 80)), app)