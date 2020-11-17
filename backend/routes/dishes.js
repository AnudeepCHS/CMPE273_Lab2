// rest - add dish, view dish, edit dish, delete dish, add image, get image, get a perticular dish

const express = require('express');
const { checkAuth } = require('../config/passport');
const kafka = require('../kafka/client');

const router = express.Router();

router.get('/restaurants/:restaurant_id', checkAuth, (req, res) => {
  req.body.path = 'dish_get_all';
  req.body.restaurant_id = req.params.restaurant_id;
  console.log('dishes.js -> dish_get_all-> Authentication Completed');
  kafka.make_request('dishes', req.body, (err, results) => {
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.post('/restaurants/:restaurant_id', checkAuth, (req, res) => {
  req.body.path = 'dish_post';
  req.body.restaurant_id = req.params.restaurant_id;
  console.log('dishes.js -> dish_post-> Authentication Completed');
  kafka.make_request('dishes', req.body, (err, results) => {
    console.log('error : ', err, 'results : ', results);
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.put('/restaurants/:restaurant_id/:dish_id', checkAuth, (req, res) => {
  req.body.path = 'dish_edit';
  req.body.restaurant_id = req.params.restaurant_id;
  req.body.dish_id = req.params.dish_id;
  console.log('dishes.js -> dish_edit-> Authentication Completed');
  kafka.make_request('dishes', req.body, (err, results) => {
    console.log('error : ', err, 'results : ', results);
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.get('/restaurants/:restaurant_id/dish/:dish_id', checkAuth, (req, res) => {
  req.body.path = 'dish_get_perticular';
  req.body.restaurant_id = req.params.restaurant_id;
  req.body.dish_id = req.params.dish_id;
  console.log('dishes.js -> dish_get_perticular-> Authentication Completed');
  console.log('dish_id :', req.params.dish_id, 'restaurant_id : ', req.params.restaurant_id);
  kafka.make_request('dishes', req.body, (err, results) => {
    console.log('error : ', err, 'results : ', results);
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.delete('/restaurants/:restaurant_id/:dish_id', checkAuth, (req, res) => {
  req.body.path = 'dish_delete';
  req.body.restaurant_id = req.params.restaurant_id;
  req.body.dish_id = req.params.dish_id;
  console.log('dishes.js -> dish_delete-> Authentication Completed');
  kafka.make_request('dishes', req.body, (err, results) => {
    console.log('error : ', err, 'results : ', results);
    if (err) {
      res.status(500).end('System Error');
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

module.exports = router;
