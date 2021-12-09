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
    createRestaurant: function(data, callback) {
        return db.query(
          'INSERT INTO restaurant (restaurant_name, restaurant_type, open_hours, price_level, location, restaurant_picture, manager_id) VALUES (?,?,?,?,?,?,?)',
          [data.restaurant_name, data.restaurant_type, data.open_hours, data.price_level, data.location, data.restaurant_picture, data.manager_id],
          callback
        );
      },
      getManagerID: function(data, callback) {
        return db.query('SELECT manager_id FROM manager where manager_email=?',
          [data.manager_email], 
          callback
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
    getManagerIdWithEmail: function(id, callback) {
        return db.query('SELECT manager_id FROM manager WHERE manager_email=?',
        [id.manager_email], callback
        );
    }
}

module.exports = public;

