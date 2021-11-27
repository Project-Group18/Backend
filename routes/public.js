const express = require('express');
const router = express.Router();
const public = require('../models/public_model');

//  Get restaurant type list
router.get('/restaurantType',
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

//  Get all restaurants
router.get('/restaurants',
  function(req, res) {
    public.getAll(function(err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
  }
);

//  Get all restaurants with type
router.get('/restaurantType/:restaurant_type?',
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

//  Get all dishes from restaurant
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

//  Get all dishes from restaurant's chosen category
router.get('restaurant/:restaurantId?/:categoryId?',
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

module.exports = router;