var middlewares = [];
var handlebars = require('handlebars');
var path = require('path');
var fs = require('fs');

var cache = {};
function renderResult(templateName, model, res){
    var templateFn = handlebars.compile(cache[templateName]);
    var responseHTML = templateFn(model);
    res.write(responseHTML);
    res.end();
}

function renderFactory(req, res){
    return function(templateName, model){
        if (!cache[templateName]){
            console.log('template loaded from file');
            var templateFile = path.join(settings["templatePath"], templateName + '.hbs');
            fs.readFile(templateFile, {encoding : 'utf8'}, function(err, fileContents){
                cache[templateName] = fileContents;
                renderResult(templateName, model, res);
            });
        } else {
            console.log('template used from cache');
            renderResult(templateName, model, res);
        }

    }
}

function app(req, res){
     res.render = renderFactory(req, res);
     function run(middlewares, req, res){
        var first = middlewares[0],
            remaining = middlewares.slice(1),
            next = function(){
                run(remaining, req, res);
            };
        if (first) 
            first(req, res, next);
    }
    run(middlewares, req, res);
}
app.use = function(middleware){
    middlewares.push(middleware);
};

var settings = {

};
app.set = function(name, value){
    settings[name] = value;
}
module.exports = app;
