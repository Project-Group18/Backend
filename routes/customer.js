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

//update customer info
router.put('/:id', 
  function(req, res) {
    var respText;
    if(req.body.customer_name != null && req.body.customer_name.length >= 2) {
      customer.updateName(req.params.id, req.body, function(err, result) {
        if (err) {
          res.json(err);
        } else {
          console.log(result);
          if (result.affectedRows==1) {
            respText += "Updating: customer_name SUCCESS\n";
          } else {
            respText += "Updating: customer_name FAILED\n";
          }
        }
      });
    }
    if(req.body.home_address != null && req.body.home_address.length >= 2) {
      customer.updateAddress(req.params.id, req.body, function(err, result) {
        if (err) {
          res.json(err);
        } else {
          console.log(result);
          if (result.affectedRows==1) {
            respText += "Updating: home_address SUCCESS\n";
          } else {
            respText += "Updating: home_address FAILED\n";
          }
        }
      });
    }
    if(req.body.credit_card != null && req.body.credit_card.length == 10) {
      customer.updateCC(req.params.id, req.body, function(err, result) {
        if (err) {
          res.json(err);
        } else {
          console.log(result);
          if (result.affectedRows==1) {
            respText += "Updating: credit_card SUCCESS\n";
          } else {
            respText += "Updating: credit_card FAILED\n";
          }
        }
      });
    }
    if(req.body.customer_password != null && req.body.customer_password.length >= 8) {
      customer.updatePassword(req.params.id, req.body, function(err, result) {
        if (err) {
          res.json(err);
        } else {
          console.log(result);
          if (result.affectedRows==1) {
            respText += "Updating: customer_password SUCCESS\n";
          } else {
            respText += "Updating: customer_password FAILED\n";
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


/* 
console.log(result);
if (result.affectedRows==1) {
res.json("Customer table updated");
} else {
  res.json("Customer could not be found");
} 
*/