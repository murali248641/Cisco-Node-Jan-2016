var calculator = require('./calculator');
var qs = require('querystring');

module.exports = function(req, res, next){
    if (req.url.pathname === '/calculator'){
        var operation = req.field('op'),
            n1 = parseInt(req.field('n1')),
            n2 = parseInt(req.field('n2'));
        var result = calculator[operation](n1,n2);
        res.write('result = ' + result);
        res.end();
        
    } else {
        next();
    }
}
