const express = require('express');
const { checkAuth } = require('../../config/passport');
const kafka = require('../../kafka/client');

const router = express.Router();

router.get('/:restaurant_id', checkAuth, (req, res) => {
  req.body.path = 'restaurant_get';
  req.body.restaurant_id = req.params.restaurant_id;
  console.log('restProfile.js -> restaurant_get-> Authentication Completed. Now calling Restaurant Profile Get');
  kafka.make_request('restProfile', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.put('/:restaurant_id', checkAuth, (req, res) => {
  req.body.path = 'restaurant_update';
  req.body.restaurant_id = req.params.restaurant_id;
  console.log('restProfile.js -> restaurant_get-> Authentication Completed. Now calling Restaurant Profile Update');
  kafka.make_request('restProfile', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

module.exports = router;
