module.exports = function (req){
    req.url = require('url').parse(req.url,true);
    return true;
}
