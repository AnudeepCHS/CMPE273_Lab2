const Restaurant = require('../models/rest_profile');

function handle_request(msg, callback) {
  var res = {};
  console.log('Calling in Restaurant.js for path : ', msg.path);
  if (msg.path === 'review_post') {
    console.log('Entered review_post');
    Restaurant.findById(msg.restaurant_id, (error, restaurant) => {
        console.log('Entered review_post for restaurant_id : ', msg.restaurant_id);
        if (error) {
            res.status = 500;
            res.message = 'SYSTEM_ERROR';
            callback(null, res);
        }
        if (restaurant) {
            console.log('Found the restaurant : ',restaurant);
            let newReview = {
                restaurant_id: msg.restaurant_id,
                customer_id: msg.customer_id,
                rating: msg.rating,
                review: msg.review,
                create_time: new Date(Date.now()),
              };
            restaurant.reviews.push(newReview);
            restaurant.save((err, saveReview) => {
                console.log('error : ', err, 'results : ', saveReview);
              if (err) {
                res.status = 500;
                res.message = 'POST_REVIEW_ERROR';
                console.log('POST_REVIEW_ERROR for Restaurant')
              } else if (saveReview) {
                res.status = 200;
                res.message = 'REVIEW_UPLOADED';
                console.log('REVIEW_UPLOADED for Restaurant')
              } else {
                console.log('Nothing happened during this call.')
              }
              callback(null, res);
            });
        } else {
            res.status = 404;
            res.message = 'REST_INVALID';
            callback(null, res);
        }
    });
  } else if (msg.path === 'review_get') {
    console.log('Entered review_get');
    Restaurant.findById(msg.restaurant_id, (err, restaurant) => {
        if (err) {
          res.status = 500;
          res.message = 'SYSTEM_ERROR';
        }
        if (restaurant) {
          let reviews = restaurant.reviews;
          res.status = 200;
          if (reviews.length > 0) {
            res.message = JSON.stringify(reviews);
          }
          else {
            res.message = 'NO_REVIEWS';
          }
        }
        callback(null, res);
      });
  }
};

exports.handle_request = handle_request;