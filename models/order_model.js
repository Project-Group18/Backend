const connection = require('../database');

const dish_order = {

  getAll: function(callback) {
    return connection.query('select * from dish_order', callback);
  },
  getById: function(id, callback) {
    return connection.query('select * from dish_order where order_id=?', [id], callback);
  },
  add: function(dish_order, callback) {
    return connection.query('insert into dish_order (total_price, message, order_status, customer_id, restaurant_id, order_arrival_time, time_until_delivery) values (?,?,?,?,?,?,?)', 
    [dish_order.total_price, dish_order.message, dish_order.order_status, dish_order.customer_id, dish_order.restaurant_id, dish_order.order_arrival_time, dish_order.time_until_delivery], callback
    );
  },
  update: function(id, dish_order, callback) {
    return connection.query(
      'update dish_order set total_price=?, message=?, order_status=?, customer_id=?, restaurant_id=?, order_arrival_time=?, time_until_delivery=? WHERE order_id=?',
      [dish_order.total_price, dish_order.message, dish_order.order_status, dish_order.customer_id, dish_order.restaurant_id, dish_order.order_arrival_time, dish_order.time_until_delivery, id],
      callback
    );
  }
};
module.exports = dish_order;


