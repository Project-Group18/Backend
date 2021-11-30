const connection = require('../database');
const bcrypt = require('bcrypt');
//saltrounds
const saltRounds = 10;


const manager = {

  getAll: function(callback) {
    return connection.query('select * from manager', callback);
  },
  getById: function(id, callback) {
    return connection.query('select * from manager where manager_id=?', [id], callback);
  },
  add: function(manager, callback) {
    //firstly salting
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) {console.log(err);}
      //mixing into the hash
      bcrypt.hash(manager.manager_password, salt, function(err, hash) {
      if(err) {console.log(err);}
      // print to the console
      console.log(hash);
      //send to the database
    return connection.query(
      'insert into manager (manager_email, manager_password, manager_name, restaurant_id) values (?,?,?,?)', 
      [manager.manager_email, hash, manager.manager_name, manager.restaurant_id], callback
       );
      });
    });
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



