const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  restaurant_id: { type: Schema.ObjectId, ref: 'rest_profile' },
  customer_id: { type: Schema.ObjectId, ref: 'cust_profile' },
  status: { type: String, required: true },
  create_time: { type: String, required: true },
  delivery_method: { type: String, required: true },
  order_dishes: [{
    dish_id:{ type: Schema.ObjectId, ref: 'dish', required: true },
    quantity: { type: Number, required: true },
  }],
},
{
  versionKey: false,
});

module.exports = mongoose.model('order', orderSchema);
