const connection = require('../database');

const customer = {

  getAll: function(callback) {
    return connection.query('select * from customer', callback);
  },
  add: function(customer, callback) {
    return connection.query(
      'insert into customer (customer_name, customer_email, home_address, credit_card, customer_password) values (?,?,?,?,?)', 
      [customer.customer_name, customer.customer_email, customer.home_address, customer.credit_card, customer.customer_password], callback
      );
  }
};
module.exports = customer;



