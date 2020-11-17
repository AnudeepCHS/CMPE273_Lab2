const Restaurant = require('../models/rest_profile');

function handle_request(msg, callback) {
    var res = {};
    console.log('Calling Restaurant method : ', msg.path);
    if (msg.path === "restaurant_get") {
        console.log('Inside Profile GET method');
        Restaurant.findById(msg.restaurant_id, (error, restaurant) => {
            if (error) {
                res.status = 500;
                res.message = "SYSTEM_ERROR";
            }
            if (restaurant) {
                console.log('Restaurant Object retrived : ', restaurant);
                const restaurantProfile = {
                    restaurant_id: restaurant._id,
                    name: restaurant.name,
                    email_id: restaurant.email_id,
                    location: restaurant.location,
                    phone: restaurant.phone,
                    description: restaurant.description,
                    timings: restaurant.timings,
                    cuisine: restaurant.cuisine,
                    delivery_method: restaurant.delivery_method,
                    map_location: restaurant.map_location,
                    rest_images: restaurant.rest_images,
                    rest_dishes: restaurant.rest_dishes,
                    reviews: restaurant.reviews,
                };
                console.log('Restaurant Object mapped : ', restaurantProfile);
                res.status = 200;
                res.message = JSON.stringify(restaurantProfile);
            } else {
                res.status = 404;
                res.message = 'REST_INVALID';
            }
            callback(null, res);
        });
    } else if (msg.path === "restaurant_update") {
        console.log('Inside Profile PUT method');
        Restaurant.findById(msg.restaurant_id, (err, restaurant) => {
          if (err) {
            res.status = 500;
            res.message = 'SYSTEM_ERROR';
            callback(null, res);
          }
          if (restaurant) {
            Restaurant.findOneAndUpdate({ _id: msg.restaurant_id },
              {
                name: msg.name,
                location: msg.location,
                phone: msg.phone,
                description: msg.description,
                timings: msg.timings,
                cuisine: msg.cuisine,
                delivery_method: msg.delivery_method,
                map_location: msg.map_location,
              },
              {
                new: true
              },
              (err, updatedRestaurant) => {
                console.log('updatedRestaurant : ', updatedRestaurant)
                if (err) {
                  res.status = 500;
                  res.message = 'UPDATE_DATA_ERROR';
                  console.log('UPDATE_DATA_ERROR')
                }
                if (updatedRestaurant) {
                  res.status = 200;
                  res.message = JSON.stringify(updatedRestaurant);
                  console.log('RESTAURANT_UPDATED : ', JSON.stringify(updatedRestaurant))
                } else {
                  console.log('Nothing happened during this call.')
                }
                callback(null, res);
              }
            );
          }
        });
    }
};

exports.handle_request = handle_request;