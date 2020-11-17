const express = require('express');
const { checkAuth } = require('../config/passport');
const kafka = require('../kafka/client');

const router = express.Router();

router.get('/restaurants/:restaurant_id', checkAuth, (req, res) => {
  req.body.path = 'restaurant_event_get';
  req.body.restaurant_id = req.params.restaurant_id;
  console.log('events.js -> restaurant_event_get-> Authentication Completed');
  kafka.make_request('events', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.post('/restaurants', checkAuth, (req, res) => {
  req.body.path = 'event_post';
  console.log('events.js -> event_post-> Authentication Completed');
  kafka.make_request('events', req.body, (err, results) => {
    console.log('error : ', err, 'results : ', results);
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.get('/customers', checkAuth, (req, res) => {
  req.body.search = req.query.search;
  req.body.order = req.query.order;
  req.body.path = 'customer_event_get';
  req.body.restaurant_id = req.params.restaurant_id;
  console.log('events.js -> customer_event_get_asc-> Authentication Completed');
  kafka.make_request('events', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.get('/customers/registered/:customer_id', checkAuth, (req, res) => {
  req.body.path = 'customer_event_get_reg';
  req.body.customer_id = req.params.customer_id;
  console.log('events.js -> customer_event_get_reg-> Authentication Completed');
  kafka.make_request('events', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.post('/customers/register', checkAuth, (req, res) => {
  req.body.path = 'customer_event_reg';
  console.log('events.js -> customer_event_reg-> Authentication Completed');
  kafka.make_request('events', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

module.exports = router;
