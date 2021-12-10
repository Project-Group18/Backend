const express = require('express');
const router = express.Router();
const customer = require('../models/customer_model');


// get all orders by customer id 
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

  // create a new order
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

//get customer CC with customer id
router.get('/getCC/:customerID?',
  function(req, res) {
    customer.getCCWithCustomerID(req.params.customerID, function(err, result) {
      if(err) {
        res.json(err)
      } else {
        res.json(result)
      }
    })
  }
);




// not in use currently

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
            console.log(result.order_id)
            //  ...to post order data correctly...
            customer.postNewOrderData(req.body, result.order_id, function(err, result) {
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

module.exports = router;