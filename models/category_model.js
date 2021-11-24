const connection = require('../database');

const category = {

  getAll: function(callback) {
    return connection.query('select * from category', callback);
  },
  getById: function(id, callback) {
    return connection.query('select * from category where category_id=?', [id], callback);
  },
  add: function(category, callback) {
    return connection.query('insert into category (category_name, restaurant_id)  values (?,?)', 
    [category.category_name, category.restaurant_id], callback
    );
  },
  update: function(id, category, callback) {
    return connection.query(
      'update category set category_name=?, restaurant_id=? WHERE category_id=?',
      [category.category_name, category.restaurant_id, id],
      callback
    );
  }
};
module.exports = category;


