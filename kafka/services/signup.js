const passwordHash = require('password-hash');
const Customer = require('../models/cust_profile');
const Restaurant = require('../models/rest_profile');

function handle_request(msg, callback) {
    var res = {};

    if (msg.url === "/customers") {

        const hashedPassword = passwordHash.generate(msg.password);
        console.log('Password hash completed');

        const newCustomer = new Customer({
        name: msg.name,
        email_id: msg.email_id,
        password: hashedPassword,
        });
        console.log('New Customer Object', newCustomer);

        Customer.findOne({ email_id: msg.email_id }, (err, customer) => {
            if (err) {
                console.error('Connection error : ', err);
                res.status = 500;
                res.message = 'CUST_SIGNUP_ERROR';
                callback(null, res);
            }
            if (customer) {
                console.error('Customer already present error');
                res.status = 500;
                res.message = 'CUST_PRESENT';
                callback(null, res);
            } else {
                newCustomer.save((error, response) => {
                if (error) {
                    console.error('Error creating customer');
                    res.status = 500;
                    res.message = 'CUST_SIGNUP_ERROR';
                    callback(null, res);
                } else if (response) {
                    console.log('Response success : ', response);
                    res.status = 200;
                    res.message = 'CUST_SIGNUP_SUCCESS';
                    callback(null, res);
                }
            });
            }
        });
    }
    else if (msg.url === "/restaurants") {

        const hashedPassword = passwordHash.generate(msg.password);
        console.log('Password hash completed');

        const newRestaurant = new Restaurant({
            name: msg.name,
            email_id: msg.email_id,
            password: hashedPassword,
            location: msg.location,
        });
        console.log('New Restaurant Object', newRestaurant);

        Restaurant.findOne({ email_id: msg.email_id }, (err, restaurant) => {
            if (err) {
                console.error('Connection error : ', err);
                res.status = 500;
                res.message = 'REST_SIGNUP_ERROR';
                callback(null, res);
            }
            if (restaurant) {
                console.error('Restaurant already present error');
                res.status = 500;
                res.message = 'REST_PRESENT';
                callback(null, res);
            } else {
            newRestaurant.save((error, response) => {
                if (error) {
                    console.error('Error creating Restaurant');
                    res.status = 500;
                    res.message = 'REST_SIGNUP_ERROR';
                    callback(null, res);
                } else if (response) {
                    console.log('Response success : ', response);
                    res.status = 200;
                    res.message = 'REST_SIGNUP_SUCCESS';
                    callback(null, res);
                }
            });
            }
        });
    }
};

exports.handle_request = handle_request;