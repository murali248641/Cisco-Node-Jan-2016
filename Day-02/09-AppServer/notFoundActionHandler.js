module.exports = function(req, res){
    console.log('resource not found handled');
    res.statusCode = 404;
    res.end();
    return true;
}
