const express = require('express');
const router = express.Router();
const manager = require('../models/manager_model');

router.get('/:id?',
 function(req, res) {

    manager.getAll(function(err, data) {
      if (err) {
        console.log(err);
        }
        res.json(data);
      });
    });



router.post('/', 
function(req, res) {
  manager.add(req.body, function(err, data) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body);
    }
  });
});


module.exports = router;


