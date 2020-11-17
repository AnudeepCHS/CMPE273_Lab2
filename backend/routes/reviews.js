const express = require('express');
const { checkAuth } = require('../config/passport');
const kafka = require('../kafka/client');

const router = express.Router();

router.get('/restaurants/:restaurant_id', checkAuth, (req, res) => {
  req.body.path = 'review_get';
  req.body.restaurant_id = req.params.restaurant_id;
  console.log('review.js -> review_get-> Authentication Completed');
  kafka.make_request('reviews', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.post('/restaurants', checkAuth, (req, res) => {
  req.body.path = 'review_post';
  console.log('review.js -> review_post-> Authentication Completed');
  kafka.make_request('reviews', req.body, (err, results) => {
    console.log('error : ', err, 'results : ', results);
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

module.exports = router;
