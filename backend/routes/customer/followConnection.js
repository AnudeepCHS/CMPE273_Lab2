const express = require('express');
const { checkAuth } = require('../../config/passport');
const kafka = require('../../kafka/client');

const router = express.Router();

router.get('/all/:customer_id', checkAuth, (req, res) => {
  req.body.path = 'get_customers';
  req.body.search = req.query.search;
  req.body.customer_id = req.params.customer_id;
  console.log('followConnection.js -> get_customers-> Authentication Completed');
  kafka.make_request('follow', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.get('/following/:customer_id', checkAuth, (req, res) => {
  req.body.path = 'get_customers_following';
  req.body.customer_id = req.params.customer_id;
  console.log('followConnection.js -> get_customers_following-> Authentication Completed');
  kafka.make_request('follow', req.body, (err, results) => {
    console.log('error : ', err, 'results : ', results);
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.post('/customer', checkAuth, (req, res) => {
  req.body.path = 'follow_customer';
  console.log('followConnection.js -> follow_customer-> Authentication Completed');
  kafka.make_request('follow', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

module.exports = router;
