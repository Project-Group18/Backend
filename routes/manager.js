const express = require('express');
const router = express.Router();
const manager = require('../models/manager_model');

//  Create new Restaurant
router.post('/createRestaurant',
  function(req, res) {
    manager.createRestaurant(req.body, function(err, result) {
      if(err) {
        res.json(err)
      } else {
        res.json(result)
      }
    })
  }
);
//  Create new Product Category
router.post('/createCategory',
  function(req, res) {
    manager.createCategory(req.body, function(err, result) {
      if(err) {
        res.json(err)
      } else {
        res.json(result)
      }
    })
  }
);
//  Create New Product
router.post('/createDish',
  function(req, res) {
    manager.createDish(req.body, function(err, result) {
      if(err) {
        res.json(err)
      } else {
        res.json(result)
      }
    })
  }
);

//  VVV     NOT TESTED YET!!!     VVV

//  Get all orders by restaurant_id, or exact order by order_id
router.get('/getOrders/:orderId?',
  function(req, res) {
    if(req.params.orderId) {
      manager.getOrderById(req.body, req.params.orderId, function(err, result) {
        if(err) {
          res.json(err)
        } else {
          res.json(result)
        }
      })
    } else {
      manager.getAllOrders(req.body, function(err, result) {
        if(err) {
          res.json(err)
        } else {
          res.json(result)
        }
      })
    }
  }
);
//get all orders by restaurant id

router.get('/getOrders/restaurant/:restid?',
  function(req, res) {
    manager.getOrderByRestid(req.params.restid, function(err, result) {
      if(err) {
        res.json(err)
      } else {
        res.json(result)
      }
    })
  }
);



//  Get Order Data
router.get('/getOrders/:orderId?/data',
  function(req, res) {
    manager.getOrderData(req.params.orderId, function(err, result) {
      if(err) {
        res.json(err)
      } else {
        res.json(result)
      }
    })
  }
);
//  Update order status
router.put('/orderStatus',
  function(req, res) {
    manager.updateOrder(req.body, function(err, result) {
      if(err) {
        res.json(err)
      } else {
        res.json(result)
      }
    })
  }  
);



//  TO BE SOLVED LATER!!!
//update manager info
/* router.put('/:id', 
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
); */      


module.exports = router;


