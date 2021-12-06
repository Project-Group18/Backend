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
      customer.getOrderById(req.body, req.params.orderId, function(err, result) {
        if(err) {
          res.json(err)
        } else {
          res.json(result)
        }
      })
    } else {
      customer.getAllOrders(req.body, function(err, result) {
        if(err) {
          res.json(err)
        } else {
          res.json(result)
        }
      })
    }
  }
);
///////
// get all orders by customer id (this will be used to present the orders on the frontpage
//until a better request is made for it)
router.get('/getOrders/customer/:customer_id?',
  function(req, res) {
    customer.getOrderByCustomerId(req.params.customer_id, function(err, result) {
      if(err) {
        res.json(err)
      } else {
        res.json(result)
      }
    })
  }
);
//get orders by customer id which have the orderstatus of receiving, delivering and all in between


//get orders by customer id which have the orderstatus of delivered

//  Get Order Data
router.get('/getOrders/:orderId?/data',
  function(req, res) {
    customer.getOrderData(req.params.orderId, function(err, result) {
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
    customer.updateOrder(req.body, function(err, result) {
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


  //get all orders which status is delivered by customer id
router.post('/orderHistory',
  function(req, res) {
    customer.getOrderHistory(req.body, function(err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
  }
);

module.exports = router;