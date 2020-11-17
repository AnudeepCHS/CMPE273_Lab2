const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
  restaurant_id: { type: String, required: true },
  customer_id: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 },
  review: { type: String, required: true },
  create_time: { type: Date, default: Date.now() },
},
{
  versionKey: false,
});

module.exports = reviewSchema;
