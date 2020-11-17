const express = require('express');
const { checkAuth } = require('../config/passport');
const kafka = require('../kafka/client');

const router = express.Router();

router.put('/restaurants/:restaurant_id', checkAuth, (req, res) => {
  req.body.method = req.method;
  req.body.restaurant_id = req.params.restaurant_id;
  req.body.path = 'restaurant_message_put';
  kafka.make_request('messages', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.get('/restaurants/:restaurant_id', checkAuth, (req, res) => {
  req.body.method = req.method;
  req.body.restaurant_id = req.params.restaurant_id;
  req.body.customer_id = req.query.customer_id;
  req.body.path = 'restaurant_messages_get';
  kafka.make_request('messages', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.get('/customers/:customer_id', checkAuth, (req, res) => {
  req.body.method = req.method;
  req.body.customer_id = req.params.customer_id;
  req.body.path = 'customer_messages_get';
  kafka.make_request('messages', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.put('/customers/:customer_id', checkAuth, (req, res) => {
  req.body.method = req.method;
  req.body.customer_id = req.params.customer_id;
  req.body.path = 'customer_message_put';
  kafka.make_request('messages', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

module.exports = router;
