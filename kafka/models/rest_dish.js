const mongoose = require('mongoose');

const { Schema } = mongoose;

// function getPrice(val) {    return (val/100); }
// function setPrice(val) {    return (val*100); }
// get: getPrice, set: setPrice

const restDishSchema = new Schema({
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  price: { type: Number, default: 0},
  category: { type: String, required: true },
  description: { type: String, required: true },
  dish_image: [{ type: String }],
},
{
  versionKey: false,
});

mongoose.model('dish', restDishSchema);
module.exports = restDishSchema;
