const express = require('express');
const router = express.Router();
const customer = require('../models/customer_model');


//  Get all customers
router.get('/customers',
  function(req, res) {
    customer.getAllCustomers(function(err, result) {
      //customer id can be pulled from the server instead of pulling it from the database (purely for testing)
      console.log("This is the customer id: " + req.user.user.id);
      //
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
  }
);


module.exports = router;