const express = require('express');
const router = express.Router();
const customer = require('../models/customer_model');

  //get customer by id
router.get('/:id?',
 function(req, res) {
  if (req.params.id) {
    customer.getById(req.params.id, function(err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
    // get all customers
  } else {
    customer.getAll(function(err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  }
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
function(req, res) {
  customer.update(req.params.id, req.body, function(err, result) {
    if (err) {
      res.json(err);
    } else {
      console.log(result);
      if (result.affectedRows==1) {
      res.json("Customer table updated");
      } else {
        res.json("Customer could not be found");
      }
    }
  });
});


module.exports = router;


