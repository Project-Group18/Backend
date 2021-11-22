const express = require('express');
const router = express.Router();
const dish = require('../models/dish_model');


  //get dish by id
router.get('/:id?',
 function(req, res) {
  if (req.params.id) {
    dish.getById(req.params.id, function(err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
    // get all dishes
  } else {
    dish.getAll(function(err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  }
});
// add a new dish
router.post('/', 
function(req, res) {
    dish.add(req.body, function(err, data) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body);
    }
  });
});


module.exports = router;


