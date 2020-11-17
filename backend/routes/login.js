const express = require('express');
const jwt = require('jsonwebtoken');
const { auth } = require('../config/passport');
const kafka = require('../kafka/client');

const router = express.Router();
const { secret } = require('../config/configuration');

auth();

router.post('/customers', (req, res) => {
  req.body.url = req.url;

  console.log('Requested Login : ', req.body.email_id);
  kafka.make_request('login', req.body, (err, results) => {
    if (err) {
      res.status(500).end('SYSTEM_ERROR');
    } else if (results.status === 200) {
      const payload = results.message;
      const token = jwt.sign(payload, secret, {
        expiresIn: 1008000,
      });
      res.json({ success: true, token: `JWT ${token}` }).end();
    } else {
      res.status(results.status).end(results.message);
    }
  });
});

router.post('/restaurants', (req, res) => {
  req.body.url = req.url;
  console.log('Requested Login : ', req.body.email_id);
  kafka.make_request('login', req.body, (err, results) => {
    if (err) {
      res.status(500).end('SYSTEM_ERROR');
    } else if (results.status === 200) {
      const payload = results.message;
      const token = jwt.sign(payload, secret, {
        expiresIn: 1008000,
      });
      res.json({ success: true, token: `JWT ${token}` });
    } else {
      res.status(results.status).end(results.message);
    }
  });
});
module.exports = router;
