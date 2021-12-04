const db = require('../database');

const public = {
    //get all restaurants
    getAllRestaurants: function(callback) {
        return db.query('SELECT * FROM restaurant',
         callback
        );
    },
    //get all restaurant types
    getAllTypes: function(callback) {
        return db.query('SELECT DISTINCT restaurant_type FROM restaurant',
        callback
        );
    },
    //get all restaurants by type
    getByType: function(type, callback) {
        return db.query('SELECT * FROM restaurant WHERE restaurant_type=?',
        [type], callback
        );
    },
    getRestaurantById: function(id, callback) {
        return db.query('select * from restaurant where restaurant_id=?', [id], callback);
      },
    //get all food categories
    getCategories: function(id, callback) {
        return db.query('SELECT * FROM category WHERE restaurant_id=?',
        [id], callback
        );
    },
    //get all dishes by rest id
    getMenu: function(id, callback) {
        return db.query('SELECT * FROM dish WHERE restaurant_id=?',
        [id], callback
        );
    },
    //get all dishes 
    getAllDishes: function(callback) {
        return db.query('select * from dish', callback);
      },
    //get all dishes by rest id and category id
    getCategoryMenu: function(restId, catId, callback) {
        return db.query('SELECT * FROM dish WHERE restaurant_id=? AND category_id=?',
        [restId, catId], callback
        );
    },

    //  VVV     TEMP TEST CODE!!!!     VVV

    // get all customers (TEMPORARY)
    getAllCustomers: function(callback) {
        return db.query('select * from customer', callback);
    },

    // get all managers (TEMPORARY)
    getAllManagers: function(callback) {
        return db.query('select * from manager', callback);
    },
}

module.exports = public;

