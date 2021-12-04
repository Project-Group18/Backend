const express = require('express');
const router = express.Router();
const newUser = require('../models/newUser_model');

router.post('/customer', 
function(req, res) {
  var nameLength = false;
  var passwordLength = false;
  var CCFormat = false;
  if(req.body.customer_name != null && req.body.customer_name.length >= 2) {
    nameLength = true;
  }
  if(req.body.customer_password != null && req.body.customer_password.length >= 8) {
    passwordLength = true;
  }
  if(req.body.credit_card.length == 10 && req.body.credit_card.match(/^\d+$/) != null) {  //  That mess of chars checks that every character in the checked string is number...
    CCFormat = true;
  }

  if(nameLength && passwordLength && CCFormat) {
    newUser.addCustomer(req.body, function(err, data) {
      if (err) {
        res.json(err);
      } else {
        res.json(req.body);
      }
    });
  } else {
    var respText = "Following errors occured: ";
    if(!nameLength) {
      respText += "Name Invalid "
    }
    if(!passwordLength) {
      respText += "Password Invalid "
    }
    if(!CCFormat) {
      respText += "CreditCardNumber Invalid"
    }
    res.send(respText)
  }
  
});

router.post('/manager', 
function(req, res) {
  var nameLength = false;
  var passwordLength = false;
  if(req.body.manager_name != null && req.body.manager_name.length >= 2) {
    nameLength = true;
  }
  if(req.body.manager_password != null && req.body.manager_password.length >= 8) {
    passwordLength = true;
  }
  if(nameLength && passwordLength) {
    newUser.addManager(req.body, function(err, data) {
      if (err) {
        res.json(err);
      } else {
        res.json(req.body);
      }
    });
  } else {
  var respText = "Following errors occured: ";
  if(!nameLength) {
    respText += "Name Invalid "
  }
  if(!passwordLength) {
    respText += "Password Invalid "
  }
  res.send(respText)
}
});

module.exports = router;