const connection = require('../database');
const bcrypt = require('bcrypt');
//saltrounds
const saltRounds = 10;

const newUser = {
    //  Customer
    addCustomer: function(data, callback) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(data.customer_password, salt, function(err, hash) {
                //console.log(hash);
                return connection.query(
                    'insert into customer (customer_name, customer_email, home_address, credit_card, customer_password) values (?,?,?,?,?)', 
                    [data.customer_name, data.customer_email, data.home_address, data.credit_card, hash],
                    callback
                );
            });
        });
    },
    //  Manager
    addManager: function(data, callback) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(data.manager_password, salt, function(err, hash) {
                //console.log(hash);
                return connection.query(
                    'insert into manager (manager_email, manager_password, manager_name) values (?,?,?)', 
                    [data.manager_email, hash, data.manager_name],
                    callback
                );
            });
        });
    }
}



module.exports = newUser;