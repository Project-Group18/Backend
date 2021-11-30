const express = require('express');
const router = express.Router();
const customer = require('../models/customer_model');


//  Get all customers
router.get('/customers',
  function(req, res) {
    customer.getAllCustomers(function(err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
  }
);


module.exports = router;