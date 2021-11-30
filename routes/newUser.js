const express = require('express');
const router = express.Router();
const newUser = require('../models/newUser_model');

router.post('/customer', 
function(req, res) {
  newUser.addCustomer(req.body, function(err, data) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body);
    }
  });
});

router.post('/manager', 
function(req, res) {
  newUser.addManager(req.body, function(err, data) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body);
    }
  });
});

module.exports = router;