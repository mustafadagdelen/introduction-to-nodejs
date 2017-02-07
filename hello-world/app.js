var http = require("http");

http.createServer(function(req,resp){
    if(req.url=="/")
    {
        resp.end("Anasayfa");
    }
    else if(req.url=="/about")
    {
        resp.end("Hakkımızda");        
    }
    else    
            resp.end("Diğer request");        

}).listen("3000");

console.log("Server started");