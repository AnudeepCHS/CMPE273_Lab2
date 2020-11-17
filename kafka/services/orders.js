const Orders = require('../models/order');
const { restDishSchema } = require('../models/rest_dish');

function handle_request(msg, callback) {
  var res = {};
  console.log('Calling in Restaurant.js for path : ', msg.path);
  if (msg.path === 'cust_orders_post') {
    console.log('Entered cust_orders_post');
    
    const newOrder = new Orders({
      restaurant_id: msg.restaurant_id,
      customer_id: msg.customer_id,
      status: 'New Order',
      delivery_method: msg.delivery_method,
      order_dishes: msg.order_dishes,
      create_time: new Date(Date.now()).toLocaleDateString("en-US", {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }),
    });
    console.log('New Order Object', newOrder);
    newOrder.save((error, order) => {
      if (error) {
        console.error('Error creating order :', error);
        res.status = 500;
        res.message = 'ORDER_POST_ERROR';
        callback(null, res);
      } else if (order) {
        console.log('Response success : ', order);
        res.status = 200;
        res.message = 'ORDER_POST_SUCCESS';
        callback(null, res);
      }
    });

  } else if (msg.path === 'rest_orders_get') {
    console.log('Entered rest_orders_get');
    
    var query = Orders.find({ 'restaurant_id': msg.restaurant_id });
    query.populate("restaurant_id");
    query.populate("customer_id");
    query.sort( { create_time: -1 } );
    query.exec((err, orders) => {
      if (err) {
        console.log(err);
        res.status = 500;
        res.message = 'SYSTEM_ERROR';
      } else {
        res.status = 200;
        if (orders.length > 0) {
          var returnOrders = orders.map(order => {
            var order_dishes = order.order_dishes.map(dish => {
              console.log('Dish:', dish);
              console.log('rest_dishes', order.restaurant_id.rest_dishes);
              
              var index = order.restaurant_id.rest_dishes.findIndex(d => d._id.equals(dish.dish_id));
              return {
                quantity: dish.quantity,
                dish_name: order.restaurant_id.rest_dishes[index].name,
                price:order.restaurant_id.rest_dishes[index].price,
              };
            })
            return {
              order_id: order._id,
              restaurant_id: order.restaurant_id._id,
              customer_id: order.customer_id,
              order_dishes: order_dishes,
              status: order.status,
              delivery_method: order.delivery_method,
              create_time: order.create_time,
            }
          })
          res.message = JSON.stringify(returnOrders);
        } else {
          res.message = 'NO_ORDERS';
        }
      }
      callback(null, res);
  });

  } else if (msg.path === 'rest_orders_put') {
    console.log('Entered rest_orders_put');
    var query = Orders.findById(msg.order_id);
    query.exec((err, order) => {
      if(err) {
        console.log(err);
        res.status = 500;
        res.message = 'SYSTEM_ERROR';
        callback(null, res);
      } else if (order) {
        order.status = msg.status;
        order.save((err, saveOrder) => {
          if(err) {
            console.log(err);
            res.status = 500;
            res.message = 'SYSTEM_ERROR';
            callback(null, res);
          } else {
            console.log(err);
            res.status = 200;
            res.message = 'ORDER_STATUS_UPDATED';
            callback(null, res);
          }
        });
      } else {
        console.log('INVALID_ORDER', err);
        res.status = 404;
        res.message = 'INVALID_ORDER';
        callback(null, res);
      }
    });
  } else if (msg.path === 'cust_orders_get') {
    console.log('Entered cust_orders_get');

    var query = Orders.find({ 'customer_id': msg.customer_id});
    query.populate("restaurant_id");
    query.sort( { create_time: -1 } );
    query.exec((err, orders) => {
      if (err) {
        console.log(err);
        res.status = 500;
        res.message = 'SYSTEM_ERROR';
      } else {
        res.status = 200;
        if (orders.length > 0) {
          var returnOrders = orders.map(order => {
            var order_dishes = order.order_dishes.map(dish => {
              console.log('Dish:', dish);
              console.log('rest_dishes', order.restaurant_id.rest_dishes);
              
              var index = order.restaurant_id.rest_dishes.findIndex(d => d._id.equals(dish.dish_id));
              return {
                quantity: dish.quantity,
                dish_name: order.restaurant_id.rest_dishes[index].name,
                price:order.restaurant_id.rest_dishes[index].price,
              };
            })
            return {
              order_id: order._id,
              restaurant_id: order.restaurant_id._id,
              restaurant_name: order.restaurant_id.name,
              customer_id: order.customer_id,
              order_dishes: order_dishes,
              status: order.status,
              delivery_method: order.delivery_method,
              create_time: order.create_time,
            }
          })
          res.message = JSON.stringify(returnOrders);
        } else {
          res.message = 'NO_ORDERS';
        }
      }
      callback(null, res);
  });
  }
};

exports.handle_request = handle_request;