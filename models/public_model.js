const db = require('../database');

const public = {
    getAllTypes: function(callback) {
        return db.query('SELECT DISTINCT restaurant_type FROM restaurant',
        callback
        );
    },
    getAll: function(callback) {
        return db.query('SELECT * FROM restaurant',
         callback
        );
    },
    getByType: function(type, callback) {
        return db.query('SELECT * FROM restaurant WHERE restaurant_type=?',
        [type], callback
        );
    },
    getCategories: function(id, callback) {
        return db.query('SELECT * FROM category WHERE restaurant_id=?',
        [id], callback
        );
    },
    getMenu: function(id, callback) {
        return db.query('SELECT * FROM dish WHERE restaurant_id=?',
        [id], callback
        );
    },
    getCategoryMenu: function(restId, catId, callback) {
        return db.query('SELECT * FROM dish WHERE restaurant_id=? AND category_id=?',
        [restId, catId], callback
        );
    }
}

module.exports = public;

