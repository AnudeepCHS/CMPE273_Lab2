const Restaurant = require('../models/rest_profile');

function handle_request(msg, callback) {
  var res = {};
  console.log('Calling in Restaurant.js for path : ', msg.path);
  if (msg.path === "restaurant_detail") {
    Restaurant.findById(msg.restaurant_id, (err, restaurantDetails) => {
      if (err) {
        console.log('Error in fetch rest details response for restaurant id : ',msg.restaurant_id, 'error : ', err);
        res.status = 500;
        res.message = 'SYSTEM_ERROR';
      }
      if (restaurantDetails) {
        console.log('restaurant_detail response for restaurant id : ',msg.restaurant_id, 'restaurant_detail : ', restaurantDetails);
        res.status = 200;
        res.message = JSON.stringify(restaurantDetails);
      }
      callback(null, res);
    });
  } else if (msg.path === "restaurant_search") {
    console.log('restaurant_search : ',msg.searchinput);
    Restaurant.find((err, restaurants) => {
      if (err) {
        console.log('Error in search results for fetch restaurant by search word : ',msg.searchinput, 'error : ', err);
        res.status = 500;
        res.message = 'SYSTEM_ERROR';
      }
      let searchresults = [];
      if (msg.searchinput === "_") {
        console.log('Fetching all restaurants');
        searchresults = restaurants;
      } else {
        console.log('Filter upon the restaurants : ', restaurants);
        restaurants.map(restaurant => {
          if ((restaurant.name.toLowerCase().includes(msg.searchinput) || ( restaurant.cuisine && restaurant.cuisine.toLowerCase().includes(msg.searchinput) ) 
          || restaurant.location.toLowerCase().includes(msg.searchinput) || ( restaurant.delivery_method && restaurant.delivery_method.toLowerCase().includes(msg.searchinput))) 
          && !searchresults.includes(restaurant))
            searchresults.push(restaurant);
          restaurant.rest_dishes.map(rest_dish => {
            if (rest_dish.name.toLowerCase().includes(msg.searchinput) && !searchresults.includes(restaurant))
                searchresults.push(restaurant);
          });
        });
      }
      res.status = 200;
      if (searchresults.length > 0) {
        res.message = JSON.stringify(searchresults);
        console.log('Search results for fetch restaurant by search word : ',msg.searchinput, 'searchresults : ', searchresults);
      }
      else {
        res.message = "NO_RECORD";
      }
      callback(null,res);
    });
  }
};

exports.handle_request = handle_request;