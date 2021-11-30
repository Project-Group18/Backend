const express = require('express');
const router = express.Router();
const order = require('../models/order_model');


  //get order by id
router.get('/:id?',
 function(req, res) {
  if (req.params.id) {
    order.getById(req.params.id, function(err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
    // get all orders
  } else {
    order.getAll(function(err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  }
});
// create a new order
router.post('/', 
function(req, res) {
  order.add(req.body, function(err, data) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body);
    }
  });
});


//update an order by id
router.put('/:id', 
function(req, res) {
    order.update(req.params.id, req.body, function(err, result) {
    if (err) {
      res.json(err);
    } else {
      console.log(result);
      if (result.affectedRows==1) {
      res.json("Dish_order table updated");
      } else {
        res.json("Dish_order could not be found");
      }
    }
  });
});

module.exports = router;


