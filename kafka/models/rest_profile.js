const mongoose = require('mongoose');

const { Schema } = mongoose;
const restDishSchema = require('./rest_dish');
const restReviewSchema = require('./review');
const messageSchema = require('./message');

const restProfileSchema = new Schema({
  name: { type: String, required: true },
  email_id: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, default: null },
  description: { type: String, default: null },
  timings: { type: String, default: null },
  cuisine: { type: String, default: null },
  delivery_method: { type: String, default: null },
  map_location: { type: String, default: null },
  rest_images: [{ type: String }],
  rest_dishes: [restDishSchema],
  reviews: [restReviewSchema]
},
{
  versionKey: false,
});

module.exports = mongoose.model('rest_profile', restProfileSchema);
