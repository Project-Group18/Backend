const express = require('express');
const router = express.Router();
const manager = require('../models/manager_model');


//  Get all managers
router.get('/managers',
  function(req, res) {
    manager.getAllManagers(function(err, result) {
      
      //customer id can be pulled from the passport instead of pulling it from the database (see if this can be implemented)
      console.log("This is the manager id: " + req.user.user.id);
      //

        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
  }
);



//  TO BE SOLVED LATER!!!
//update manager info
router.put('/:id', 
  function(req, res) {
    var respText;
    if(req.body.manager_name != null && req.body.manager_name.length >= 2) {
      manager.updateName(req.params.id, req.body, function(err, result) {
        if (err) {
          res.json(err);
        } else {
          console.log(result);
          if (result.affectedRows==1) {
            respText += "Updating: manager_name SUCCESS\n";
          } else {
            respText += "Updating: manager_name FAILED\n";
          }
        }
      });
    }
    if(req.body.manager_password != null && req.body.manager_password.length >= 8) {
      manager.updatePassword(req.params.id, req.body, function(err, result) {
        if (err) {
          res.json(err);
        } else {
          console.log(result);
          if (result.affectedRows==1) {
            respText += "Updating: manager_password SUCCESS\n";
          } else {
            respText += "Updating: manager_password FAILED\n";
          }
        }
      });
    }
    //  !!!BUG!!!   respText = undefined???
    console.log(respText);
    res.json(respText);
  }
);      


module.exports = router;


