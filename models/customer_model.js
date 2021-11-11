const connection = require('../index');

const customer = {

  getAll: function(callback) {
    return connection.query('select * from customer', callback);
  }
};
module.exports = customer;



