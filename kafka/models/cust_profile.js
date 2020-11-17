const mongoose = require('mongoose');

const { Schema } = mongoose;

const custProfileSchema = new Schema({
  name: { type: String, required: true },
  email_id: { type: String, required: true },
  password: { type: String, required: true },
  profile_picture: { type: String, default: null },
  phone: { type: String, default: null },
  dob: { type: String, default: null },
  city: { type: String, default: null },
  state: { type: String, default: null },
  country: { type: String, default: null },
  nick_name: { type: String, default: null },
  about: { type: String, default: null },
  join_date: { type: Date, default: Date.now() },
  favourite_restaurant: { type: String, default: null },
  favourite_hobby: { type: String, default: null },
  blog_url: { type: String, default: null },
  following: [{ type: Schema.ObjectId, ref: 'cust_profile' }],
},
{
  versionKey: false,
});

module.exports = mongoose.model('cust_profile', custProfileSchema);
