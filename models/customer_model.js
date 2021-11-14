const connection = require('../database');

const customer = {

  getAll: function(callback) {
    return connection.query('select * from customer', callback);
  },
  add: function(customer, callback) {
    return connection.query(
      'insert into customer (customer_name) values (?)', 
      [customer.customer_name], callback
      );
  }
};
module.exports = customer;



