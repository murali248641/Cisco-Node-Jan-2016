var middlewares = [];
function app(req, res){
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

module.exports = app;