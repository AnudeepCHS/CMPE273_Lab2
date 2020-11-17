// get all users except the one requesting - filter by location, search by name and nickname
// follow
// get all following
const Customer = require('../models/cust_profile');

function handle_request(msg, callback) {
    var res = {};
    console.log('Calling in followConnection.js for path : ', msg.path);
    if (msg.path === 'get_customers') {
        console.log('Entered get_customers');
        var search = msg.search;
        if (!search) {
            search = "";
        }
        var searchresults = [];
        Customer.find((err, customers) => {
            if (err) {
                res.status = 500;
                res.message = 'SYSTEM_ERROR';
            } else {
                if (msg.search === "") {
                    console.log('Fetching all customers');
                    searchresults = customers;
                } else {
                    console.log('Filter upon the customers : ', customers);
                    customers.map(customer => {
                        console.log(customer.name, customer.nick_name);
                        if (customer.name.toLowerCase().includes(search.toLowerCase()) && !searchresults.includes(customer))
                            searchresults.push(customer);
                        if (customer.nick_name && customer.nick_name.toLowerCase().includes(search.toLowerCase()) && !searchresults.includes(customer))
                            searchresults.push(customer);
                        });
                }
                res.status = 200;
                if (searchresults.length > 0) {
                    let yelpCustomers = [];
                    searchresults.map( customer => {
                        const customerDetails = {
                            customer_id: customer._id,
                            name: customer.name,
                            email_id: customer.email_id,
                            phone: customer.phone,
                            dob: customer.dob,
                            city: customer.city,
                            state: customer.state,
                            country: customer.country,
                            nick_name: customer.nick_name,
                            about: customer.about,
                            join_date: customer.join_date,
                            favourite_restaurant: customer.favourite_restaurant,
                            favourite_hobby: customer.favourite_hobby,
                            blog_url: customer.blog_url,
                            profile_picture: customer.profile_picture,
                        };
                        yelpCustomers.push(customerDetails);
                    });
                    yelpCustomers.map( customer => {
                        if(customer.customer_id.equals(msg.customer_id)) {
                            console.log('Yelp Customer :',customer, ' with id: ', customer._id);
                            console.log('Requester id : ', msg.customer_id);
                            console.log('Removing self :',customer.customer_id.equals(msg.customer_id));
                            var index = yelpCustomers.findIndex(customer => customer.customer_id.equals(msg.customer_id));
                            console.log(index);
                            yelpCustomers.splice(index,1);
                        }
                    });
                    res.message = JSON.stringify(yelpCustomers);
                    console.log('yelpCustomers : ', yelpCustomers);
                }
                else {
                    res.message = 'NO_CUSTOMERS';
                }
            }
            callback(null, res);
        })
    } else if (msg.path === 'get_customers_following') {
        console.log('Entered get_customers_following');
        var query = Customer.findById(msg.customer_id);
        query.populate("following");
        query.exec((err, customer) => {
            if (err) {
                res.status = 500;
                res.message = 'SYSTEM_ERROR';
            } else if(customer){
                res.status = 200;
                if (customer.following.length > 0) {
                    customer.following.map(yelpUser => {
                        console.log(yelpUser);
                        yelpUser.password = undefined;
                        yelpUser.following = undefined;
                        return yelpUser; 
                    });
                    res.message = JSON.stringify(customer.following);
                    console.log('Yelpers Following : ', customer.following);
                } else if ( customer.following.length === 0 ){
                    res.message = 'NO_FOLLOWING';
                }
            }
            callback(null, res);
        });
    } else if (msg.path === 'follow_customer') {
        console.log('Entered follow_customer');
        Customer.findById(msg.customer_id, (error, customer) => {
            console.log('Entered follow_customer for customer_id : ', msg.customer_id, 'To follow the user : ', msg.following_id);
            if (error) {
                res.status = 500;
                res.message = 'SYSTEM_ERROR';
                callback(null, res);
            }
            if (customer) {
                console.log('Found the customer : ',customer);
            
                var already_following_flag = false;
                console.log('length : ', customer.following.length);
                if(customer.following.length>0) {
                    console.log('Found the customer following: ',customer.following);
                    customer.following.map(following_id => {
                        console.log('following_id : ', following_id);
                        console.log('customer_id : ', msg.customer_id);
                        console.log('compare id : ', following_id.equals(msg.customer_id));
                        if (following_id.equals(msg.following_id)) {
                            res.status = 200;
                            res.message = 'ALREADY_FOLLOWING';
                            console.log('ALREADY_FOLLOWING');
                            already_following_flag = true;
                            callback(null, res);
                        }
                    });
                } 
                if(!already_following_flag){
                    console.log('Not ALREADY_FOLLOWING');
                    customer.following.push(msg.following_id);
                    customer.save((err, followSuccess) => {
                        console.log('error : ', err, 'results : ', followSuccess);
                        if (err) {
                            res.status = 500;
                            res.message = 'FOLLOW_CUSTOMER_ERROR';
                            console.log('FOLLOW_CUSTOMER_ERROR for customer : ', err)
                        } else if (followSuccess) {
                            res.status = 200;
                            res.message = 'FOLLOWING_SUCCESSFULLY';
                            console.log('FOLLOWING_SUCCESSFULLY for customer')
                        } else {
                            console.log('Nothing happened during this call.')
                        }
                        callback(null, res);
                    });
                }
            } else {
                res.status = 404;
                res.message = 'CUSTOMER_INVALID';
                callback(null, res);
            }
        });
    }
};
  
exports.handle_request = handle_request;