const express = require('express');
const { checkAuth } = require('../../config/passport');
const kafka = require('../../kafka/client');

const router = express.Router();

router.get('/:customer_id', checkAuth, (req, res) => {
  req.body.path = 'customer_get';
  req.body.customer_id = req.params.customer_id;
  console.log('custProfile.js -> customer_get-> Authentication Completed');

  kafka.make_request('custProfile', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.put('/:customer_id', checkAuth, (req, res) => {
  req.body.path = 'customer_update';
  req.body.customer_id = req.params.customer_id;
  kafka.make_request('custProfile', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

module.exports = router;
