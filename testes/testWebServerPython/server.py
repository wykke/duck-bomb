import eventlet
import socketio

sio = socketio.Server()

app = socketio.WSGIApp(sio, static_files={
    '/': '.\client\index.html',
    '/script1.js': '.\client\script1.js',
    '/script2.js': '.\client\script2.js',
})


if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('127.0.0.1', 80)), app)