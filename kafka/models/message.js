const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
  restaurant_id:{type: Schema.ObjectId, ref: 'rest_profile'},
  customer_id: {type: Schema.ObjectId, ref: 'cust_profile'},
  messages: [{
    sender_id: {type: String, required: true},
    receiver_id: {type: String, required: true},
    message_content: {type: String, required: true},
    message_time: {type: String, required: true},
  }],
},
{
  versionKey: false,
});

module.exports = mongoose.model('message', messageSchema);
