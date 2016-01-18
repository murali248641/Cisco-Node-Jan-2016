var fs = require('fs');
var fileName = process.argv[2];
if (!fileName){
    console.log("File name required");
    process.exit(1);
}
/*if (!fs.existsSync(fileName)){
    console.log("file doesnot exist - ", fileName);
    process.exit(1);
}*/
fs.readFile(fileName, {encoding : 'utf8'}, function(err, fileContents){
    if (err){
        console.log("Something went wrong", err);
        return;
    }
    console.log(fileContents);
    console.log("Job done");
});
