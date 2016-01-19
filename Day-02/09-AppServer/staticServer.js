var path = require('path');
var fs = require('fs');

var staticResourceExtns = ['.html', '.css','.js','.ico','.png','.jpg','.xml'];
function isStatic(resource){
    return staticResourceExtns.indexOf(path.extname(resource)) !== -1;
}
module.exports = function(resourcePath){
    return function(req, res, next){
        var resource = path.join(resourcePath, req.url.pathname);
        if (isStatic(resource)){
            if (!fs.existsSync(resource)){
                res.statusCode = 404;
                res.end();
                return;
            }
            fs.createReadStream(resource).pipe(res);
        } else {
            next();
        }
    }
};
