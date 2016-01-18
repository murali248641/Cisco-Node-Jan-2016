/* Sync */
function add(x,y){
    console.log("[Provider] processing ", x , " and  ", y);
    if(!x || !y)
        throw new Error("Invalid arguments");
    var result = x + y;
    console.log("[Provider] returning result");
    return x + y;
}

function addClient(x,y){
    try{
        console.log("[Consumer] triggering add");
        var result = add(x,y);
        console.log("[Consumer] result = ", result);
    } catch (err){
      console.log("[Consumer] Error handled for ", err);
    }
}

function addAsync(x,y, onResult){
    console.log("[Provider] processing ", x , " and  ", y);
    setTimeout(function(){
        if(!x || !y){
            var err =new Error("Invalid arguments");
            onResult(err, null);
            return;
        }
        var result = x + y;
        console.log("[Provider] returning result");
        if (typeof onResult === 'function')
            onResult(null, result);
    },3000);

}

function addAsyncClient(x,y){
    console.log("[Consumer] triggering add");
    addAsync(x,y, function(err, result){
        if (err){
            console.log("[Consumer] Error handled for ", err);
            return;
        }
        console.log("[Consumer] result = ", result);
    });
}

module.exports = {
    addClient: addClient,
    addAsyncClient : addAsyncClient
};
