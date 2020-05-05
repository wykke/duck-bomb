module.exports = function(server, app, express, port){
    server.listen(port, "0.0.0.0", ()=>{
        console.log("server aberto")
    })

    app.use(express.static(__dirname+"/client"));
    
}