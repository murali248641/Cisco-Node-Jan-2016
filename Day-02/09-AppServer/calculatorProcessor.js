var calculator = require('./calculator');
var fs = require('fs');
var handlebars = require('handlebars');
var qs = require('querystring');
var path = require('path');

module.exports = function(req, res, next){
    if (req.url.pathname === '/calculator'){
        var operation = req.field('op'),
            n1 = parseInt(req.field('n1')),
            n2 = parseInt(req.field('n2'));
        var result = calculator[operation](n1,n2);
        var viewModel = {
            n1 : n1,
            n2 : n2,
            op : operation,
            result : result
        };
        res.render('calculatorResponse', viewModel);
    } else {
        next();
    }
}
