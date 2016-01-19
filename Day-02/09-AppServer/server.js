var http = require('http'),
    path = require('path'),
    dataParser = require('./dataParser'),
    staticServer = require('./staticServer'),
    calculatorProcessor = require('./calculatorProcessor'),
    notFoundActionHandler = require('./notFoundActionHandler'),
    app = require('./app');


app.set("templatePath" , path.join(__dirname, './templates'));

app.use(dataParser);
app.use(staticServer(path.join(__dirname, './public')));
app.use(calculatorProcessor);
app.use(notFoundActionHandler);

http.createServer(app).listen(8080);
console.log("Server listening on port 8080");
