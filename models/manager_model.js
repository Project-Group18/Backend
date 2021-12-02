const connection = require('../database');
const bcrypt = require('bcrypt');
//saltrounds
const saltRounds = 10;


const manager = {

  getAllManagers: function(callback) {
    return connection.query('select * from manager', callback);
  },
  
  updateName: function(id, manager, callback) {
    return connection.query(
      'update manager set manager_name=? WHERE manager_id=?',
      [manager.manager_name, id],
      callback
    );
  },
  updatePassword: function(id, manager, callback) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(manager.manager_password, salt, function(err, hash) {
        console.log(hash);
        return connection.query(
          'update manager set manager_password=? WHERE manager_id=?',
          [hash, id],
          callback
        );
      });
    });
  }
};
module.exports = manager;



