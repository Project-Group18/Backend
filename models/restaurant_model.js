const connection = require('../database');

const restaurant = {

  getAll: function(callback) {
    return connection.query('select * from restaurant', callback);
  }
};
module.exports = restaurant;



