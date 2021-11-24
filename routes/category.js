const express = require('express');
const router = express.Router();
const category = require('../models/category_model');


  //get category by id
router.get('/:id?',
 function(req, res) {
  if (req.params.id) {
    category.getById(req.params.id, function(err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
    // get all categories
  } else {
    category.getAll(function(err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  }
});
// create a new category
router.post('/', 
function(req, res) {
  category.add(req.body, function(err, data) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body);
    }
  });
});


//update a category by id
router.put('/:id', 
function(req, res) {
    category.update(req.params.id, req.body, function(err, result) {
    if (err) {
      res.json(err);
    } else {
      console.log(result);
      if (result.affectedRows==1) {
      res.json("Category table updated");
      } else {
        res.json("Category could not be found");
      }
    }
  });
});

module.exports = router;


