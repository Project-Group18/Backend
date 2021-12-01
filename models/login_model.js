const connection = require('../database');

const login = {

    checkPassword: function(id, callback) {
    return connection.query('SELECT customer_password FROM customer WHERE customer_email=?',[id], callback);
  },
    returnUser: function(id, callback) {
      return connection.query('SELECT * from customer where customer_email=?',[id], callback);
    }
};
module.exports = login;



