var http = require("http");

http.createServer(function (req, resp) {
    if (req.url == "/") {

    }
    else if (req.url == "/about") {
        resp.end("Hakkımızda");
    }
    else if (req.url == "/saveuser" && req.method == "POST") {
        var body = [];
        req.on("data", function (chunk) {
            body.push(chunk);

        }).on("end", function () {
            body = Buffer.concat(body).toString();

           var reqBody =JSON.parse(body);
            console.log(reqBody.username);
            var userName = reqBody.username;
            var pwd = reqBody.password;

            if (userName === "mustafa")
                resp.write("<p>Hoşgeldiniz" + userName + "</p>");
            else
                resp.write("<p>Giriş Başarısız.</p>");

             resp.end();
        });
    }

}).listen("3000");

console.log("Server started");

