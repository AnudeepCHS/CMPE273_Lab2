const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var customerSchema = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    emailId:{type:String,required:true},
    contactNumber:{type:String,required:false},
    city:{type:String,required:false},
    state:{type:String,required:false},
    country:{type:String,required:false},
    dob:{type:Date,required:false},
    nick:{type:String,required:false},
    yelpingSince:{type:Date,required:false},
    image:{type:String,required:false},
    findMeIn:{type:String,required:false},
    website:{type:String,required:false}
} ,
{
    versionKey: false
},
{ collection: 'customer' });

module.exports = mongoose.model('customer', customerSchema);