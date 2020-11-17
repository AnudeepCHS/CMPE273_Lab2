const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
  restaurant_id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  hashtags: { type: String, required: true },
  participants: [{ type: Schema.ObjectId, ref: 'cust_profile' }],
},
{
  versionKey: false,
});

module.exports = mongoose.model('event', eventSchema);
