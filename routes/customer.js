const express = require('express');
const router = express.Router();
const customer = require('../models/customer_model');

//  Post a new Order
router.post('/newOrder',
  function(req, res) {
    customer.postNewOrder(req.body, function(err, result) {
      if(err) {
        res.json(err)
      } else {
        //  Try to get newly created order id...
        customer.getNewOrderId(req.body, function(err, result) {
          if(err) {
            res.json(err)
          } else {
            //  ...to post order data correctly...
            customer.postNewOrderData(req.body, result.order_id[0], function(err, result) {
              if(err) {
                res.json(err)
              } else {
                res.json(result)
              }
            })
          }
        })
      }
    })
  }
);
//  Get order by id or all orders...
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
router.put('/confirmDelivery',
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


//get customer by customer id
router.get('/:id?',
 function(req, res) {
  if (req.params.id) {
    customer.getCustomerById(req.params.id, function(err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  } 
  });
  // simpliefied version of previous order post request
  // this will be used to test the shopping cart create order implementation
  router.post('/createOrder', 
  function(req, res) {
    customer.addOrder(req.body, function(err, data) {
      if (err) {
        res.json(err);
      } else {
        res.json(req.body);
      }
    });
  });


module.exports = router;