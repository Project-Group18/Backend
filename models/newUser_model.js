const connection = require('../database');
const bcrypt = require('bcrypt');
//saltrounds
const saltRounds = 10;

const newUser = {
    //  Customer
    addCustomer: function(customer, callback) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(customer.customer_password, salt, function(err, hash) {
                console.log(hash);
                return connection.query(
                    'insert into customer (customer_name, customer_email, home_address, credit_card, customer_password) values (?,?,?,?,?)', 
                    [customer.customer_name, customer.customer_email, customer.home_address, customer.credit_card, hash],
                    callback
                );
            });
        });
    },
    //  Manager
    addManager: function(manager, callback) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(manager.manager_password, salt, function(err, hash) {
                console.log(hash);
                return connection.query(
                    'insert into manager (manager_email, manager_password, manager_name) values (?,?,?)', 
                    [manager.manager_email, hash, manager.manager_name],
                    callback
                );
            });
        });
    }
}



module.exports = newUser;