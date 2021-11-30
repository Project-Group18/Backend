const connection = require('../database');

const restaurant = {

  getAll: function(callback) {
    return connection.query('select * from restaurant', callback);
  },
  getById: function(id, callback) {
    return connection.query('select * from restaurant where restaurant_id=?', [id], callback);
  },
  add: function(restaurant, callback) {
    return connection.query('insert into restaurant (restaurant_name, restaurant_type, open_hours, price_level, location, restaurant_picture) values (?,?,?,?,?,?)', 
    [restaurant.restaurant_name, restaurant.restaurant_type, restaurant.open_hours, restaurant.price_level, restaurant.location, restaurant.restaurant_picture], callback
    );
  },
  update: function(id, restaurant, callback) {
    return connection.query(
      'update restaurant set restaurant_name=?, restaurant_type=?, open_hours=?, price_level=?, location=?, restaurant_picture=? WHERE restaurant_id=?',
      [restaurant.restaurant_name, restaurant.restaurant_type, restaurant.open_hours, restaurant.price_level, restaurant.location, restaurant.restaurant_picture, id],
      callback
    );
  }
};
module.exports = restaurant;


