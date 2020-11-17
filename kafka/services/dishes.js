const Restaurant = require('../models/rest_profile');
const Dish = require('../models/rest_dish');

function handle_request(msg, callback) {
  var res = {};
  console.log('Calling in Restaurant.js for path : ', msg.path);
  if (msg.path === 'dish_post') {
    console.log('Entered dish_post');
    Restaurant.findById(msg.restaurant_id, (error, restaurant) => {
      console.log('Entered review_post for restaurant_id : ', msg.restaurant_id);
      if (error) {
        res.status = 500;
        res.message = 'SYSTEM_ERROR';
        callback(null, res);
      } else if( restaurant ) {
        console.log('Found the restaurant : ',restaurant);
        let newDish = {
          name: msg.name,
          ingredients: msg.ingredients,
          price: msg.price,
          category: msg.category,
          description: msg.description,
        };
        restaurant.rest_dishes.push(newDish);
        restaurant.save((err, saveDish) => {
          console.log('error : ', err, 'results : ', saveDish);
          if (err) {
            res.status = 500;
            res.message = 'POST_DISH_ERROR';
            console.log('POST_DISH_ERROR for Restaurant')
          } else if (saveDish) {
            res.status = 200;
            res.message = 'DISH_UPLOADED';
            console.log('DISH_UPLOADED for Restaurant')
          } else {
            console.log('Nothing happened during this call.')
          }
          callback(null, res);
        });
      } else {
        res.status = 404;
        res.message = 'RESTAURANT_INVALID';
        callback(null, res);
      }
    }); 
  } else if (msg.path === 'dish_get_all') {
    console.log('Entered dish_get_all');
    Restaurant.findById(msg.restaurant_id, (err, restaurant) => {
      if (err) {
        res.status = 500;
        res.message = 'SYSTEM_ERROR';
      }
      if (restaurant) {
        let rest_dishes = restaurant.rest_dishes;
        res.status = 200;
        if (rest_dishes.length > 0) {
          res.message = JSON.stringify(rest_dishes);
        }
        else {
          res.message = 'NO_DISHES';
        }
      }
      callback(null, res);
    });
  } else if (msg.path === 'dish_get_perticular') {
    console.log('Entered dish_get_perticular');
    console.log('dish_id :', msg.dish_id, 'restaurant_id : ', msg.restaurant_id);
    Restaurant.findById(msg.restaurant_id, (err, restaurant) => {
      if (err) {
        res.status = 500;
        res.message = 'SYSTEM_ERROR';
      }
      if (restaurant) {
        let rest_dishes = restaurant.rest_dishes;
        let rest_dish = null;
        rest_dishes.map(dish => {
          if(dish._id.equals(msg.dish_id)){
            rest_dish = dish;
          }
        });
        res.status = 200;
        if (rest_dish) {
          res.message = JSON.stringify(rest_dish);
        }
        else {
          res.message = 'NO_DISH';
        }
      }
      callback(null, res);
    });
  } else if (msg.path === 'dish_edit') {
    console.log('Entered dish_edit');
    Restaurant.findById(msg.restaurant_id, (error, restaurant) => {
      console.log('Entered dish_edit for restaurant_id : ', msg.restaurant_id, ' dish_id: ', msg.dish_id);
      if( error ) {
        res.status = 500;
        res.message = 'SYSTEM_ERROR';
        callback(null, res);
      } else if( restaurant ) {
        var index = -1;
        if(restaurant.rest_dishes.length > 0) { 
          index = restaurant.rest_dishes.map(dish => dish._id).indexOf(msg.dish_id);
        }
        console.log('Request edit of Dish id : ', msg.dish_id);
        console.log('Removing index :', index);
        if (index > -1) {
          restaurant.rest_dishes[index].name = msg.name;
          restaurant.rest_dishes[index].ingredients = msg.ingredients;
          restaurant.rest_dishes[index].price = msg.price;
          restaurant.rest_dishes[index].category = msg.category;
          restaurant.rest_dishes[index].description = msg.description;
          restaurant.save((err, editDish) => {
            console.log('error : ', err, 'results : ', editDish);
            if (err) {
              res.status = 500;
              res.message = 'EDIT_DISH_ERROR';
              console.log('EDIT_DISH_ERROR for Restaurant')
            } else if (editDish) {
              dishRemovedFlag = true;
              res.status = 200;
              res.message = 'DISH_EDITED';
              console.log('DISH_EDITED for Restaurant')
            } else {
              console.log('Nothing happened during this call.')
            }
            callback(null, res);
          });
        } else {
          res.status = 404;
          res.message = 'DISH_INVALID';
          console.log('DISH_INVALID for Restaurant')
          callback(null, res);
        } 
      } else {
        res.status = 404;
        res.message = 'RESTAURANT_INVALID';
        console.log('RESTAURANT_INVALID for Restaurant');
        callback(null, res);
      }
    });
  } else if (msg.path === 'dish_delete') {
    console.log('Entered dish_delete');
    Restaurant.findById(msg.restaurant_id, (err, restaurant) => {
      if (err) {
        res.status = 500;
        res.message = 'SYSTEM_ERROR';
        callback(null, res);
      }
      if (restaurant) {
        var index = -1;
        if(restaurant.rest_dishes.length > 0) { 
          index = restaurant.rest_dishes.map(dish => dish._id).indexOf(msg.dish_id);
        }
        console.log('Request deletion of Dish id : ', msg.dish_id);
        console.log('Removing index :', index);
        if (index > -1) {
          restaurant.rest_dishes.splice(index,1);
          restaurant.save((err, deletedDish) => {
            console.log('error : ', err, 'results : ', deletedDish);
            if (err) {
              res.status = 500;
              res.message = 'DELETE_DISH_ERROR';
              console.log('DELETE_DISH_ERROR for Restaurant')
            } else if (deletedDish) {
              dishRemovedFlag = true;
              res.status = 200;
              res.message = 'DISH_DELETED';
              console.log('DISH_DELETED for Restaurant')
            } else {
              console.log('Nothing happened during this call.')
            }
            callback(null, res);
          });
        } else {
          res.status = 404;
          res.message = 'DISH_INVALID';
          console.log('DISH_INVALID for Restaurant')
          callback(null, res);
        }         
      } else {
        res.status = 404;
        res.message = 'RESTAURANT_INVALID';
        console.log('RESTAURANT_INVALID for Restaurant');
        callback(null, res);
      }
    });
  }
};

exports.handle_request = handle_request;