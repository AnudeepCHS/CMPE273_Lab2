"use strict"
const app = require("../../app");
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/sessionConfig');
const customer = require('../../models/customer');
const kafka = require('../../kafka/client');
//Route to handle Post Request Call

router.post("/login", async (req, res) => {
  console.log("reached login"+JSON.stringify(req.body))
  kafka.make_request('rest-login',req.body, function(err,result){
        if(err) {
          
          res.status(401).end("No such user exists");
        }
        else {
          if (result.isMatch) {
            const payload = {_id: result._id};
            console.log("success")
            const token = jwt.sign(payload,secret, {
              expiresIn: 900000 // in seconds
            });
            let jwtToken = 'JWT ' + token;
            res.status(200).end(jwtToken);
          }
          else {
            res.status(401).end("Incorrect password");
          }
        }
        
    })
      });
module.exports = router;