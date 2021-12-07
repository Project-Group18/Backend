const express = require('express');
const router = express.Router();
const public = require('../models/public_model');

//  Get all restaurants//
router.get('/restaurant',
  function(req, res) {
    public.getAllRestaurants(function(err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
  }
);

//  Get restaurant type list
router.get('/restaurant/type',
 function(req, res) {
    public.getAllTypes(function(err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
  }
);

//  Get all restaurants by type
router.get('/restaurant/type/:restaurant_type?',
    function(req, res) {
        public.getByType(req.params.restaurant_type, function(err, result) {
            if(err) {
                res.json(err);
            } else {
                res.json(result);
            }
        });
    }
);

//  Get a restaurant by id
router.get('/restaurant/:restaurant_id?',
    function(req, res) {
        public.getRestaurantById(req.params.restaurant_id, function(err, result) {
            if(err) {
                res.json(err);
            } else {
                res.json(result);
            }
        });
    }
);

//  Get all categories from restaurant
router.get('/restaurant/:restaurantId?/category',
    function(req, res) {
        public.getCategories(req.params.restaurantId, function(err, result) {
            if(err) {
                res.json(err);
            } else {
                res.json(result);
            }
        });
    }
);

//  Get all dishes from restaurant with restaurant id
router.get('/restaurant/:restaurantId?/menu',
    function(req, res) {
        public.getMenu(req.params.restaurantId, function(err, result) {
            if(err) {
                res.json(err);
            } else {
                res.json(result);
            }
        });
    }
);
//  Get all dishes 
router.get('/dishes',
  function(req, res) {
    public.getAllDishes(function(err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
  }
);



//  Get all dishes from restaurant's chosen category
router.get('/restaurant/:restaurantId?/category/:categoryId?',
function(req, res) {
    public.getCategoryMenu(req.params.restaurantId, req.params.categoryId, function(err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
}
);

//  Get manager id with manager email (in use)
router.post('/managerid/email',
    function(req, res) {
        public.getManagerIdWithEmail(req.body, function(err, result) {
            if(err) {
                res.json(err);
            } else {
                res.json(result);
            }
        });
    }
);

//  VVV     TEMP TEST CODE!!!!     VVV

//  Get all customers (temporary)
router.get('/customers',
  function(req, res) {
    public.getAllCustomers(function(err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
  }
);


//  Get all managers (temporary)
router.get('/managers',
  function(req, res) {
    public.getAllManagers(function(err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
  }
);


//  Create new Restaurant
router.post('/createRestaurant',
  function(req, res) {
   public.createRestaurant(req.body, function(err, result) {
      if(err) {
        res.json(err)
      } else {
        res.json(result)
      }
    })
  }
);


  //get manager id by manager email
  router.post('/managerid/email',
  function(req, res) {
    manager.getManagerID(req.body, function(err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
  }
);

module.exports = router;