const express = require('express');
const router = express.Router();
const restaurant = require('../models/restaurant_model');


  //get restaurant by id
router.get('/:id?',
 function(req, res) {
  if (req.params.id) {
    restaurant.getById(req.params.id, function(err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
    // get all restaurants
  } else {
    restaurant.getAll(function(err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  }
});


//add a new restaurant
router.post('/', 
function(req, res) {
  restaurant.add(req.body, function(err, data) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body);
    }
  });
});


//update restaurant info
router.put('/:id', 
function(req, res) {
  restaurant.update(req.params.id, req.body, function(err, result) {
    if (err) {
      res.json(err);
    } else {
      console.log(result);
      if (result.affectedRows==1) {
      res.json("restaurant table updated");
      } else {
        res.json("restaurant could not be found");
      }
    }
  });
});

module.exports = router;


