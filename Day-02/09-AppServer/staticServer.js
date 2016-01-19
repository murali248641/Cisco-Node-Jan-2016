var path = require('path');
var fs = require('fs');

var staticResourceExtns = ['.html', '.css','.js','.ico','.png','.jpg','.xml'];
function isStatic(resource){
    return staticResourceExtns.indexOf(path.extname(resource)) !== -1;
}
module.exports = function(req, res, next){
    var resource = path.join(__dirname, req.url.pathname);
    if (isStatic(resource)){
        if (!fs.existsSync(resource)){
            res.statusCode = 404;
            res.end();
        }
        //fs.createReadStream(resource).pipe(res);
        var stream = fs.createReadStream(resource);
        stream.pipe(res);
        /*stream.on('data', function(chunk){
            console.log('stream writing data to response');
            res.write(chunk);
        });
        stream.on('end', function(){
            console.log('end of stream');
            res.end();
        });*/

    } else {
        next();
    }
}
