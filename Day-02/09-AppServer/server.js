var http = require('http'),
    dataParser = require('./dataParser'),
    staticServer = require('./staticServer'),
    calculatorProcessor = require('./calculatorProcessor'),
    notFoundActionHandler = require('./notFoundActionHandler');


var server = http.createServer(function(req, res){
    dataParser(req, res)
    if (!staticServer(req, res)){
        if (!calculatorProcessor(req, res)){
            notFoundActionHandler(req, res);
        }
    }
});
server.listen(8080);
console.log("Server listening on port 8080");

/*
Modularize the above code in to the following components and assemble them in server.js
1. dataParser (line numbers 14, 32 to 37)
2. staticServer (line numbers 16 to 23, 8 to 11)
3. calculatorProcessor (line numbers 23 to 44)
4. notFoundActionHandler (line numbers 46 to 47)

*/
