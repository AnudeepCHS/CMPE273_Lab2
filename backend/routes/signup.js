const express = require('express');
const kafka = require('../kafka/client');

const router = express.Router();

router.post('/customers', (req, res) => {
  req.body.url = req.url;

  kafka.make_request('signup', req.body, (err, results) => {
    if (err) {
      res.status(500).end('SYSTEM_ERROR');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.post('/restaurants', (req, res) => {
  req.body.url = req.url;

  kafka.make_request('signup', req.body, (err, results) => {
    if (err) {
      res.status(500).end('SYSTEM_ERROR');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

module.exports = router;
