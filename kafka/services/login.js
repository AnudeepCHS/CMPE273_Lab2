var bcrypt = require('bcryptjs');
const customer = require('../models/customer');

function handle_request(msg, callback){
     var res ={isMatch:false};
    console.log("In handle request:"+ JSON.stringify(msg));
            
    customer.find({ name:msg.name}).toArray( (err,result) =>{
       
        if(result.length > 0){
            var hash = result[0].Password;
            bcrypt.compare(msg.password,hash,function(err,doesMatch){
                if(doesMatch){
                 res= {isMatch:true,
                       _id:result[0]._id}
                    
                }
                callback(null,true);
            });
        }
        else{
            callback(err,"no such user");
        }
    });
       
    }

    exports.handle_request = handle_request;
