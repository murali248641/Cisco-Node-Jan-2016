var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    qs = require('querystring'),
    calculator = require('./calculator');

var staticResourceExtns = ['.html', '.css','.js','.ico','.png','.jpg','.xml'];
function isStatic(resource){
    return staticResourceExtns.indexOf(path.extname(resource)) !== -1;
}

var server = http.createServer(function(req, res){
    var urlObj = url.parse(req.url,true);
    var resource = path.join(__dirname, urlObj.pathname);
    if (isStatic(resource)){
        if (!fs.existsSync(resource)){
            res.statusCode = 404;
            res.end();
            return;
        }
        fs.createReadStream(resource).pipe(res);
    } else if (urlObj.pathname === '/calculator' && req.method === 'GET'){
        var reqData = urlObj.query;
        var operation = reqData.op,
            n1 = parseInt(reqData.n1),
            n2 = parseInt(reqData.n2);
        var result = calculator[operation](n1,n2);
        res.write('result = ' + result);
        res.end();
    } else if (urlObj.pathname === '/calculator' && req.method === 'POST'){
        var reqDataString = '';
        req.on('data', function(chunk){
            reqDataString += chunk;
        });
        req.on('end', function(){
            var reqData = qs.parse(reqDataString);
            var operation = reqData.op,
                n1 = parseInt(reqData.n1),
                n2 = parseInt(reqData.n2);
            var result = calculator[operation](n1,n2);
            res.write('result = ' + result);
            res.end();
        });
    } else {
        res.statusCode = 404;
        res.end();
    }
});
server.listen(8080);
console.log("Server listening on port 8080");

/*
Modularize the above code in to the following components and assemble them in server.js
1. dataParser (line numbers 14, 32 to 37)
2. staticServer (line numbers 16 to 23, 8 to 11)
3. calculatorProcessor (line numbers 23 to 44)
4. notFoundActionHandler (line numbers 46 to 47)

*/
