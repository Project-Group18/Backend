const db = require('../database');

const login = {

    //customer
    checkCustomer: function(email, callback) {
      return db.query('SELECT * from customer where customer_email=?',
      [email],
      callback);
    },
    //manager
    checkManager: function(email, callback) {
      return db.query('SELECT manager.manager_id, manager.manager_name, manager.manager_email, manager.manager_password, restaurant.restaurant_id from manager JOIN restaurant on manager.manager_id = restaurant.manager_id where manager_email=?',
      [email],
      callback);
    }
};


module.exports = login;



