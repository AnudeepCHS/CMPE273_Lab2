const passwordHash = require('password-hash');
const Customer = require('../models/cust_profile');
const Restaurant = require('../models/rest_profile');

function handle_request(msg, callback) {
    var res = {};
  
    if (msg.url === "/customers") {
        Customer.findOne({ email_id: msg.email_id }, (error, customer) => {
            if (error) {
              res.status = 500;
              res.message = 'SYS_ERROR';
            }
            if (!customer) {
              res.status = 401;
              res.message = 'CUST_INVALID';
            }
            if (customer) {
              if (passwordHash.verify(msg.password, customer.password)) {
                console.log(customer);
                const payload = {
                  customer_id: customer._id,
                };
                
                res.status = 200;
                res.message = payload;
              } else {
                res.status = 401;
                res.message = 'CUST_INVALID_CRED';
              }
            }
            callback(null, res);
        });

    } else if (msg.url === "/restaurants") {
        Restaurant.findOne({ email_id: msg.email_id }, (error, restaurant) => {
            if (error) {
              res.status = 500;
              res.message = 'SYS_ERROR';
            }
            if (!restaurant) {
              res.status = 401;
              res.message = 'REST_INVALID';
            }
            if (restaurant) {
              if (passwordHash.verify(msg.password, restaurant.password)) {
                console.log(restaurant);
                const payload = {
                  restaurant_id: restaurant._id,
                };
                res.status = 200;
                res.message = payload;
              } else {
                res.status = 401;
                res.message = 'REST_INVALID_CRED';
              }
            }
            callback(null, res);
        });
    }
};
  
exports.handle_request = handle_request;


  
  