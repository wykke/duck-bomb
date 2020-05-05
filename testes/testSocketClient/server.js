const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

const site = require('./server/serverSite')(server, app, express, 80)
const socket = require('./server/serverSocket')(sockets)
