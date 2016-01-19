var http = require('http'),
    dataParser = require('./dataParser'),
    staticServer = require('./staticServer'),
    calculatorProcessor = require('./calculatorProcessor'),
    notFoundActionHandler = require('./notFoundActionHandler'),
    app = require('./app');

app.use(dataParser);
app.use(staticServer);
app.use(calculatorProcessor);
app.use(notFoundActionHandler);

http.createServer(app).listen(8080);
console.log("Server listening on port 8080");
