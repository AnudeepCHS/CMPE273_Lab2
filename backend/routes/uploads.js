const express = require('express');
const multer = require('multer');
const path = require('path');
const kafka = require('../kafka/client');
const { checkAuth } = require('../config/passport');

const router = express.Router();

const custStorage = multer.diskStorage({
  destination: `${path.join(__dirname, '..')}/public/uploads/customers`,
  filename: (req, file, cb) => {
    cb(null, `customer-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const customerUploads = multer({
  storage: custStorage,
  limits: { fileSize: 1000000 },
}).single('image');

router.post('/customers/:customer_id/profilePicture', checkAuth, (req, res) => {
  customerUploads(req, res, (err) => {
    console.log('Image Upload Call for Customer');
    if (err) {
      console.log('Error Uploading Image');
    } else {
      req.body.path = 'cust_image';
      req.body.customer_id = req.params.customer_id;
      req.body.filename = req.file.filename;

      console.log('Filename: ', req.file.filename);
      kafka.make_request('imageUpload', req.body, (error, results) => {
        if (error) {
          res.status(500).end('System Error');
        } else {
          res.status(results.status).end(results.message);
        }
      });
    }
  });
});

const resStorage = multer.diskStorage({
  destination: `${path.join(__dirname, '..')}/public/uploads/restaurants`,
  filename: (req, file, cb) => {
    cb(null, `restaurant-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const restaurantUploads = multer({
  storage: resStorage,
  limits: { fileSize: 1000000 },
}).single('image');

router.post('/restaurants/:restaurant_id/restaurantImages', checkAuth, (req, res) => {
  restaurantUploads(req, res, (err) => {
    console.log('Image Upload Call for Restaurant');
    if (err) {
      console.log('Error Uploading Image');
    } else {
      req.body.path = 'rest_image';
      req.body.restaurant_id = req.params.restaurant_id;
      req.body.filename = req.file.filename;

      console.log('Filename: ', req.file.filename);
      kafka.make_request('imageUpload', req.body, (error, results) => {
        if (error) {
          res.status(500).end('System Error');
        } else {
          res.status(results.status).end(results.message);
        }
      });
    }
  });
});

const dishStorage = multer.diskStorage({
  destination: `${path.join(__dirname, '..')}/public/uploads/dishes`,
  filename: (req, file, cb) => {
    cb(null, `dish-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const dishUploads = multer({
  storage: dishStorage,
  limits: { fileSize: 1000000 },
}).single('image');

router.post('/restaurants/:restaurant_id/dishes/:dish_id/dishImages', checkAuth, (req, res) => {
  dishUploads(req, res, (err) => {
    console.log('Image Upload Call for Dish');
    if (err) {
      console.log('Error Uploading Image', err);
      res.status(500).end('System Error');
    } else {
      req.body.path = 'dish_image';
      req.body.restaurant_id = req.params.restaurant_id;
      req.body.filename = req.file.filename;
      req.body.dish_id = req.params.dish_id;

      console.log('Filename: ', req.file.filename);
      kafka.make_request('imageUpload', req.body, (error, results) => {
        if (error) {
          res.status(500).end('System Error');
        } else {
          res.status(results.status).end(results.message);
        }
      });
    }
  });
});

module.exports = router;
