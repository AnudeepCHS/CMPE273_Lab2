const express = require('express');
const { checkAuth } = require('../config/passport');
const kafka = require('../kafka/client');

const router = express.Router();

router.post('/customers', checkAuth, (req, res) => {
  req.body.path = 'cust_orders_post';
  console.log('orders.js -> cust_orders_post -> Authentication Completed');
  kafka.make_request('orders', req.body, (err, results) => {
    console.log('error : ', err, 'results : ', results);
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.get('/restaurants/:restaurant_id', checkAuth, (req, res) => {
  req.body.path = 'rest_orders_get';
  req.body.restaurant_id = req.params.restaurant_id;
  console.log('orders.js -> rest_orders_get -> Authentication Completed');
  kafka.make_request('orders', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.put('/:order_id', checkAuth, (req, res) => {
  req.body.path = 'rest_orders_put';
  req.body.order_id = req.params.order_id;
  console.log('orders.js -> rest_orders_put -> Authentication Completed');
  kafka.make_request('orders', req.body, (err, results) => {
    console.log('error : ', err, 'results : ', results);
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.get('/customers/:customer_id', checkAuth, (req, res) => {
  req.body.path = 'cust_orders_get';
  req.body.customer_id = req.params.customer_id;
  console.log('orders.js -> cust_orders_get -> Authentication Completed');
  kafka.make_request('orders', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

module.exports = router;
