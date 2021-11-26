const express = require('express');
const router = express.Router();
const dish = require('../models/dish_model');


  //
  //get dish by restaurant id
router.get('/:id?',
 function(req, res) {
  if (req.params.id) {
    dish.getByRestId(req.params.id, function(err, result) {
      //changed "getById" to "getByRestId"
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


/* router.get('/:id?',
 function(req, res) {
   if (req.params.id) {
     dish.getByRestId(req.params.id, function(err, result) {
       if(err) { 
         res.json(err);
        } else {
          res.json(result);
        }
     })
   }
 }
) */




module.exports = router;


