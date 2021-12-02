const db = require('../database');

const login = {

    //customer side
    checkCustomerPassword: function(id, callback) {
      return db.query('SELECT customer_password FROM customer WHERE customer_email=?',[id], callback);
    },
    returnCustomer: function(id, callback) {
      return db.query('SELECT * from customer where customer_email=?',[id], callback);
    },
    //manager side
    checkManagerPassword: function(id, callback) {
      return db.query('SELECT manager_password FROM manager WHERE manager_email=?',[id], callback);
    },
    returnManager: function(id, callback) {
      return db.query('SELECT * from manager where manager_email=?',[id], callback);
    }
};



module.exports = login;



