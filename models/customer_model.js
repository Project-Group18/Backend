const db = require('../database');

        
    const customer = 
    {
        // get all customers
            getAllCustomers: function(callback) {
            return db.query('select * from customer', callback);
        }

    }


module.exports = customer;