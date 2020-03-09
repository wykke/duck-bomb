module.exports = function(server, app, port){
    server.listen(port, "0.0.0.0", ()=>{
        console.log("server aberto")
    })
    
    app.get('/', function (req, res) {
        console.log(req.params)
        res.sendFile(__dirname+"/client/index.html")
    })
    
    app.get('/game.js', function(req,res){
        res.sendFile(__dirname+"/client/game.js")
    })
    
    app.get('/style.css', function(req,res){
        res.sendFile(__dirname+"/client/style.css")
    })
    
    app.get('/sprite.png', function(req,res){
        res.sendFile(__dirname+"/client/sprite.png")
    })
}