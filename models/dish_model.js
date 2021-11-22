const connection = require('../database');

const dish = {

  getAll: function(callback) {
    return connection.query('select * from dish', callback);
  },
  getById: function(id, callback) {
    return connection.query('select * from dish where dish_id=?', [id], callback);
  },
  add: function(dish, callback) {
    return connection.query('insert into dish (dish_name, price, category_id, dish_picture, dish_info) values (?,?,?,?,?)', 
    [dish.dish_name, dish.price, dish.category_id, dish.dish_picture, dish.dish_info], callback
    );
  }
};
module.exports = dish;


