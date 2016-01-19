var calculator = require('./calculator');
var qs = require('querystring');

module.exports = function(req, res){
    var reqHandled = false;
    if (req.url.pathname === '/calculator' && req.method === 'GET'){
        var reqData = req.url.query;
        var operation = reqData.op,
            n1 = parseInt(reqData.n1),
            n2 = parseInt(reqData.n2);
        var result = calculator[operation](n1,n2);
        res.write('result = ' + result);
        res.end();
        reqHandled = true;
    } else if (req.url.pathname === '/calculator' && req.method === 'POST'){
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
        reqHandled = true;
    }
    return reqHandled;
}
