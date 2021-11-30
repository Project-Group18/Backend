const connection = require('../database');
const bcrypt = require('bcrypt');
//saltrounds
const saltRounds = 10;

const customer = {

  getAll: function(callback) {
    return connection.query('select * from customer', callback);
  },
  getById: function(id, callback) {
    return connection.query('select * from customer where customer_id=?', [id], callback);
  },
  add: function(customer, callback) {
    //firstly salting
    bcrypt.genSalt(saltRounds, function(err, salt) {
      //mixing into the hash
      bcrypt.hash(customer.customer_password, salt, function(err, hash) {
      // print to the console
      console.log(hash);
      //send to the database
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
  updateName: function(id, customer, callback) {
    return connection.query(
      'update customer set customer_name=? WHERE customer_id=?',
      [customer.customer_name, id],
      callback
    );
  },
  updateAddress: function(id, customer, callback) {
    return connection.query(
      'update customer set home_address=? WHERE customer_id=?',
      [customer.home_address, id],
      callback
    );
  },
  updateCC: function(id, customer, callback) {
    return connection.query(
      'update customer set credit_card=? WHERE customer_id=?',
      [customer.credit_card, id],
      callback
    );
  },
  updatePassword: function(id, customer, callback) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(customer.customer_password, salt, function(err, hash) {
        console.log(hash);
        return connection.query(
          'update customer set customer_password=? WHERE customer_id=?',
          [hash, id],
          callback
        );
      });
    });
  }
};
module.exports = customer;



