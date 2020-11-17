const Customer = require('../models/cust_profile');
const Restaurant = require('../models/rest_profile');

function handle_request(msg, callback) {
  console.log('passport.js -> msg : ', msg);
  console.log('passport.js -> msg customer_id : ', msg.customer_id);
  console.log('passport.js -> msg restaurant_id : ', msg.restaurant_id);
  if (msg.customer_id) {
    console.log('passport.js - > authenticating customer : ', msg.customer_id);
    const customer_id = msg.customer_id;
    Customer.findById(customer_id, (err, results) => {
      if (err) {
        return callback(err, false);
      }
      if (results) {
        callback(null, results);
      } else {
        callback(null, false);
      }
    });
  } else if (msg.restaurant_id) {
    console.log('passport.js - > authenticating restaurant : ', msg.restaurant_id);
    const restaurant_id = msg.restaurant_id;
    Restaurant.findById(restaurant_id, (err, results) => {
      if (err) {
        return callback(err, false);
      }
      if (results) {
        callback(null, results);
      } else {
        callback(null, false);
      }
    });
  }
};

exports.handle_request = handle_request;
