"use strict"
const app = require("../../app");
const express = require("express");
const router = express.Router();
const customer = require('../../models/customer');
const bcrypt = require("bcryptjs");
//Route to handle Post Request Call
router.post("/signup", async (req, res) => {
console.log("reached signup")
/*var newUser = new customer({
   //emailId: req.body.userEmail,
    password: req.body.password,
    name: req.body.name
    });*/
    req.body.password = bcrypt.hash(req.body.password,10)
    kafka.make_request('signup',req.body, function(err,result){
    if (err){
      res.status(500).end("System Error");
    }
    if(result){
      res.status(500).end("User name already exists");
    }else{
      res.status(200).end("User added");
    } 
  });
  
})
module.exports = router;