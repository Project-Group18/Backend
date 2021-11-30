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


//  Get all restaurants
router.get('/restaurants',
  function(req, res) {
    customer.getAllRestaurants(function(err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
  }
);

//  Get all dishes
router.get('/dishes',
  function(req, res) {
    customer.getAllDishes(function(err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
  }
);




module.exports = router;