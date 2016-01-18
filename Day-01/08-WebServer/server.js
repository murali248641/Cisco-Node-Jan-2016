var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url');

var server = http.createServer(function(req, res){
    console.log(__dirname);
    var urlObj = url.parse(req.url);
    var resource = path.join(__dirname, urlObj.pathname);
    console.log(urlObj.pathname);
    console.log(resource);
    if (!fs.existsSync(resource)){
        res.statusCode = 404;
        res.end();
        return;
    }
    var stream = fs.createReadStream(resource);
    stream.on('data', function(dataChunk){
        res.write(dataChunk);
    });
    stream.on('end', function(){
        res.end();
    });

});
server.listen(8080);
console.log("Server listening on port 8080");

/*
res.statusCode = 404;
res.end()
*/
