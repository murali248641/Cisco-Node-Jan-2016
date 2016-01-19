var handlebars = require('handlebars');

var template = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body><h2>{{name}}</h2><h3>{{salary}}</h3><h4>{{city}}</h4></body</html>';

var data = {
    name : 'Magesh',
    salary : 10000,
    city : 'Bangalore'
};

var templateFn = handlebars.compile(template);
var result = templateFn(data);
console.log(result);
