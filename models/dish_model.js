const connection = require('../database');

const dish = {

  getAll: function(callback) {
    return connection.query('select * from dish', callback);
  },
  getById: function(id, callback) {
    return connection.query('select * from dish where dish_id=?', [id], callback);
  },
  add: function(dish, callback) {
    return connection.query('insert into dish (dish_name, price, category_id, dish_picture, dish_info, restaurant_id) values (?,?,?,?,?,?)', 
    [dish.dish_name, dish.price, dish.category_id, dish.dish_picture, dish.dish_info, dish.restaurant_id], callback
    );
  },
  getByRestId: function(id, callback) {
    return connection.query('select * from dish where restaurant_id=?', [id], callback);
  }
};
module.exports = dish;


