const express = require('express');
const router = express.Router();
const customer = require('../models/customer_model');

router.get('/:id?',
 function(req, res) {

    customer.getAll(function(err, data) {
      if (err) {
        console.log(err);
      }
        res.json(data);
      
    });
});

router.post('/', 
function(request, res) {
  customer.add(request.body, function(err, data) {
    if (err) {
      res.json(err);
    } else {
      res.json(request.body);
    }
  });
});



module.exports = router;


