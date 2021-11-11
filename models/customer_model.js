const connection = require('../database');

const customer = {

  getAll: function(callback) {
    return connection.query('select * from customer', callback);
  }
};
module.exports = customer;



