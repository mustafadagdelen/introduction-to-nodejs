var http = require("http");

http.createServer(function (req, resp) {
    if (req.url == "/") {
        resp.end("<b>Anasayfa</b>");
    }
    else if (req.url == "/about") {
        resp.end("<i>Hakkımızda</i>");
    }
    else
        resp.end("<u>Diğer request</u>");

}).listen("3000");

