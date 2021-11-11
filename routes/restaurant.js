const express = require('express');
const router = express.Router();
const restaurant = require('../models/restaurant_model');

router.get('/:id?',
 function(req, res) {

    restaurant.getAll(function(err, data) {
      if (err) {
        console.log(err);
      }
        res.json(data);
    });
});


module.exports = router;


