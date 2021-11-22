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


module.exports = router;


