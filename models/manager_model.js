const connection = require('../database');
const bcrypt = require('bcrypt');
//saltrounds
const saltRounds = 10;


const manager = {

  getAll: function(callback) {
    return connection.query('select * from manager', callback);
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
  }
};
module.exports = manager;



