const express = require('express')
const app = express()

app.listen(80, ()=>{
    console.log("server aberto")
})

app.get('/', function (req, res) {
    res.sendFile(__dirname+"/index.html")
})

app.get('/game.js', function(req,res){
    res.sendFile(__dirname+"/game.js")
})

app.get('/style.css', function(req,res){
    res.sendFile(__dirname+"/style.css")
})

app.get('/download.png', function(req,res){
    res.sendfile(__dirname+"/download.png")
})
