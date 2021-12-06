const db = require('../database');

const manager = {

  createRestaurant: function(data, callback) {
    return db.query(
      'INSERT INTO restaurant (restaurant_name, restaurant_type, open_hours, price_level, location, restaurant_picture, manager_id) VALUES (?,?,?,?,?,?,?)',
      [data.restaurant_name, data.restaurant_type, data.open_hours, data.price_level, data.location, data.restaurant_picture, data.manager_id],
      callback
    );
  },
  createCategory: function(data, callback) {
    return db.query(
      'INSERT INTO category (category_name, restaurant_id) VALUES (?,?)',
      [data.category_name, data.restaurant_id],
      callback
    );
  },
  createDish: function(data, callback) {
    return db.query(
      'INSERT INTO dish (dish_name, price, category_id, dish_picture, dish_info, restaurant_id) VALUES (?,?,?,?,?,?)',
      [data.dish_name, data.price, data.category_id, data.dish_picture, data.dish_info, data.restaurant_id],
      callback
    );
  },
  getOrderById: function(data, orderId, callback) {
    return db.query(
      'SELECT * FROM dish_order WHERE restaurant_id=? AND order_id=?',
      [data.restaurant_id, orderId],
      callback
    )
  },
  getAllOrders: function(data, callback) {
    return db.query(
      'SELECT * FROM dish_order WHERE restaurant_id=?',
      [data.restaurant_id],
      callback
    )
  },
  getOrderData: function(orderId, callback) {
    return db.query(
      'SELECT dish.dish_name AS Product, dish.price AS Price, dish_data.dish_amount AS Quantity FROM dish INNER JOIN dish_data ON dish.dish_id=dish_data.dish_id WHERE dish_data.order_id=? ',
      [orderId],
      callback
    )
  },
  updateOrder: function(data, callback) {
    return db.query(
      'UPDATE dish_order SET order_status=? WHERE (order_id=? AND restaurant_id=?)',
      [data.order_status, data.order_id, data.restaurant_id],
      callback
    )
  },
  ////
  getOrderByRestid: function(restid, callback) {
    return db.query(
      'SELECT * from dish_order WHERE restaurant_id=?',
      [restid],
      callback
    )
  }
  /* //  TO BE SOLVED LATER...
  updateName: function(id, manager, callback) {
    return db.query(
      'update manager set manager_name=? WHERE manager_id=?',
      [manager.manager_name, id],
      callback
    );
  },
  updatePassword: function(id, manager, callback) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(manager.manager_password, salt, function(err, hash) {
        console.log(hash);
        return db.query(
          'update manager set manager_password=? WHERE manager_id=?',
          [hash, id],
          callback
        );
      });
    });
  } */
};
module.exports = manager;



