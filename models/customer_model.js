const connection = require('../database');
const bcrypt = require('bcrypt');
//saltrounds
const saltRounds = 10;

const customer = {

  getAll: function(callback) {
    return connection.query('select * from customer', callback);
  },
  add: function(customer, callback) {
    //suolataan ensin
    bcrypt.genSalt(saltRounds, function(err, salt) {
      //mixing into the hash
      bcrypt.hash(customer.customer_password, salt, function(err, hash) {
      // print to the console
      console.log(hash);
      //sent to the database
    return connection.query(
      'insert into customer (customer_name, customer_email, home_address, credit_card, customer_password) values (?,?,?,?,?)', 
      [customer.customer_name, customer.customer_email, customer.home_address, customer.credit_card, hash], callback
       );
      });
    });
  },
  delete: function(id, callback) {
    return connection.query('delete from customer where customer_id=?', [id], callback);
  },
  update: function(id, customer, callback) {
    return connection.query(
      'update customer set customer_id=?, customer_email=?, home_address=?, credit_card=?, customer_password=?',
      [customer.customer_id, customer.customer_email, customer.home_address, customer.credit_card, customer.customer_password, id],
      callback
    );
  }
};
module.exports = customer;



