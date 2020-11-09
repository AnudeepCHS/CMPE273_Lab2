const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var restaurantSchema = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    location: {type: String, required: true},
    emailId:{type:String,required:true},
    contactNumber:{type:String,required:false},
    description:{type:String,required:false},
    timings:{type:Date,required:false},
    image:{type:String,required:false},
    findMeIn:{type:String,required:false},
    website:{type:String,required:false},
    dishes: [{ 
        name: {type: String, required: true}
    }]
} ,
{
    versionKey: false
},
{ collection: 'restaurant' });

module.exports = mongoose.model('restaurant', restaurantSchema);