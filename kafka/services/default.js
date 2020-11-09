const customer = require('../models/customer');

function handle_request(msg, callback){
     
    console.log("In handle request:"+ JSON.stringify(msg));
            
    customer.find({ name:msg.name}).toArray( (err,result) =>{
       
        if(result.length > 0){
           callback(null,false);
        }
        else{
            callback(null,true);
        }
    });
       
    }

    exports.handle_request = handle_request;
