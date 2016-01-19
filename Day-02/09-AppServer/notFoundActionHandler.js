module.exports = function(req, res, next){
    console.log('resource not found handled');
    res.statusCode = 404;
    res.end();
    next();
}
