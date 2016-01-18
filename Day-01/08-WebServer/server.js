var http = require('http');
var server = http.createServer(function(req, res){
    res.write("<h1>Welcome to node.js</h1>");
    res.write("You have requested the resource - " + req.url);
    res.end();
});
server.listen(8080);
console.log("Server listening on port 8080");

/*
res.statusCode = 404;
res.end()
*/
