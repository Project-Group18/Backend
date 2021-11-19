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
function(req, res) {
  customer.add(req.body, function(err, data) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body);
    }
  });
});

router.delete('/:id', 
function(req, res) {
  customer.delete(req.params.id, function(err, result) {
    console.log(req.params.id);
    if (err) {
      res.json(err);
    } else {
      res.json('Row deleted');
    }
  });
});


router.put('/:id', 
function(request, response) {
  customer.update(request.params.id, request.body, function(err, result) {
    if (err) {
      response.json(err);
    } else {
      response.json(result);
    }
  });
});


module.exports = router;


