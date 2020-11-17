const express = require('express');
const { checkAuth } = require('../../config/passport');
const kafka = require('../../kafka/client');

const router = express.Router();

router.get('/details/:restaurant_id', checkAuth, (req, res) => {
  req.body.path = 'restaurant_detail';
  req.body.restaurant_id = req.params.restaurant_id;

  kafka.make_request('restaurants', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.get('/input/:search_input', checkAuth, (req, res) => {
  req.body.path = 'restaurant_search';
  req.body.searchinput = req.params.search_input.toLowerCase();

  kafka.make_request('restaurants', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

module.exports = router;
