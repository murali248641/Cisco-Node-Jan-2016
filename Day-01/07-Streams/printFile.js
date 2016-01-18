var fs = require('fs');
var fileName = process.argv[2];
if (!fileName){
    console.log("File name required");
    process.exit(1);
}
if (!fs.existsSync(fileName)){
    console.log("file doesnot exist - ", fileName);
    process.exit(1);
}
var stream = fs.createReadStream(fileName, {encoding : 'utf8'});
var readCount = 0;
stream.on('open', function(){
    console.log('[Log] stream opened');
})
stream.on('close', function(){
    console.log('[Log] stream closed');
})
stream.on('end', function(){
    console.log('[Log] no more data to read after reading ', readCount, ' times');
})
stream.on('data', function(dataChunk){
    ++readCount;
    //console.log('[Log] data chunk read');
    //console.log(dataChunk);
});
stream.on('error', function(err){
    console.log('[Log] stream erred..', err);
});

stream.pipe(process.stdout);
