const Customer = require('../models/cust_profile');
const Restaurant = require('../models/rest_profile');

function handle_request(msg, callback) {
  var res = {};
  console.log('Kafka message path for Upload Image',msg.path);
  if (msg.path === "cust_image") {
    console.log('Inside Customer Image Upload POST method');
    Customer.findById(msg.customer_id, (err, customer) => {
      if (err) {
        console.log('Customer Image Upload Error');
        res.status = 500;
        res.message = 'SYSTEM_ERROR';
        callback(null, res);
      }
      if (customer) {
        customer.profile_picture = msg.filename;
        customer.save((err, imageUploaded) => {
          if (err) {
            res.status = 500;
            res.message = 'UPLOAD_IMAGE_ERROR';
            console.log('UPLOAD_IMAGE_ERROR')
          } else if (imageUploaded) {
            res.status = 200;
            res.message = msg.filename;
            console.log('CUSTOMER_IMAGE_UPLOADED')
          } else {
            console.log('Nothing happened during this call.')
          }
          callback(null, res);
        });
      }
    });
  } else if (msg.path === "rest_image") {
    console.log('Inside Restaurant Image Upload POST method');
    Restaurant.findById(msg.restaurant_id, (err, restaurant) => {
      console.log(err,restaurant);
      if (err) {
        console.log('Restaurant Image Upload Error');
        res.status = 500;
        res.message = 'SYSTEM_ERROR';
        callback(null, res);
      }
      if (restaurant) {
        restaurant.rest_images.push(msg.filename);
        restaurant.save((err, imageUploaded) => {
          if (err) {
            res.status = 500;
            res.message = 'UPLOAD_IMAGE_ERROR';
            console.log('UPLOAD_IMAGE_ERROR for Restaurant')
          } else if (imageUploaded) {
            res.status = 200;
            res.message = msg.filename;
            console.log('RESTAURANT_IMAGE_UPLOADED for Restaurant')
          } else {
            console.log('Nothing happened during this call.')
          }
          callback(null, res);
        });
      }
    });
  } else if(msg.path === "dish_image") {
    console.log('Inside Dish Image Upload POST method');
    Restaurant.findById(msg.restaurant_id, (err, restaurant) => {
      console.log(err,restaurant);
      if (err) {
        console.log('Dish Image Upload Error');
        res.status = 500;
        res.message = 'SYSTEM_ERROR';
        callback(null, res);
      }
      if (restaurant) {
        var index = -1;
        if(restaurant.rest_dishes.length > 0) { 
          index = restaurant.rest_dishes.map(dish => dish._id).indexOf(msg.dish_id);
        }
        console.log('Request image upload of Dish id : ', msg.dish_id);
        console.log('Uploading to index :', index);
        if (index > -1) {
          restaurant.rest_dishes[index].dish_image.push(msg.filename);
          restaurant.save((err, imageUploaded) => {
            console.log('error : ', err, 'results : ', imageUploaded);
            if (err) {
              res.status = 500;
              res.message = 'UPLOAD_IMAGE_ERROR';
              console.log('UPLOAD_IMAGE_ERROR for Dish')
            } else if (imageUploaded) {
              dishRemovedFlag = true;
              res.status = 200;
              res.message = 'DISH_IMAGE_UPLOADED';
              console.log('DISH_IMAGE_UPLOADED for Dish')
            } else {
              console.log('Nothing happened during this call.')
            }
            callback(null, res);
          });
        } else {
          res.status = 404;
          res.message = 'DISH_INVALID';
          console.log('DISH_INVALID for DishImage');
          callback(null, res);
        }
      } else if (!restaurant) {
        res.status = 404;
        res.message = 'RESTAURANT_INVALID';
        console.log('RESTAURANT_INVALID for DishImage');
        callback(null, res);
      }
    });
  }
};

exports.handle_request = handle_request;