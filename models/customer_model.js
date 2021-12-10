const db = require('../database');

    var dateTime = new Date();
    
    const customer = 
    {
        getOrderByCustomerId: function(data, callback) {
            return db.query(
                'SELECT * FROM dish_order WHERE customer_id=?',
                [data],
                callback
            )
        },
        updateOrder: function(data, callback) {
            return db.query(
                'UPDATE dish_order SET order_status=? WHERE (order_id=? AND customer_id=?)',
                [data.order_status, data.order_id, data.customer_id],
                callback
            )
        },
        getCustomerById: function(id, callback) {
            return db.query('select * from customer where customer_id=?', [id], callback);
            },
            addOrder: function(data, callback) {
            return db.query(
                'INSERT INTO dish_order (total_price, message, order_status, customer_id, restaurant_id, order_arrival_time, delivery_location, product_list) VALUES (?,?,?,?,?,?,?,?)',
                [data.total_price, data.message, "Received", data.customer_id, data.restaurant_id, dateTime, data.delivery_location, data.items],
                callback
            )
        },
        getOrderHistory: function(data, callback) {
            return db.query('SELECT * FROM dish_order where order_status=? AND customer_id=?',
                [data.order_status, data.customer_id], 
                callback
            );
        },
        getCCWithCustomerID: function(data, callback) {
            return db.query(
                'SELECT credit_card FROM customer WHERE customer_id=?',
                [data],
                callback
            )
        },



              //not in use currently
            postNewOrder: function(data, callback) {
                return db.query(
                    'INSERT INTO dish_order (total_price, message, order_status, customer_id, restaurant_id, order_arrival_time, delivery_location) VALUES (?,?,?,?,?,?,?)',
                    [data.total_price, data.message, "Received", data.customer_id, data.restaurant_id, dateTime, data.delivery_location],
                    callback
                )
            },  

            getNewOrderId: function(data, callback) {
                return db.query(
                    'SELECT order_id FROM dish_order WHERE customer_id=? ORDER BY order_id desc LIMIT 1',
                    [data.customer_id],
                    callback
                )
            },
            postNewOrderData: function(data, orderId, callback) {
                    var count = 0;
                    data.items.forEach(item => {
                    count++;
                    db.query(
                    'INSERT INTO dish_data (order_id, dish_id, dish_amount) VALUES (?,?,?)',
                    [orderId, item.dish_id, item.dish_amount],
                    callback
                    )
                });
                return count;
            },
            getOrderById: function(data, orderId, callback) {
                return db.query(
                    'SELECT * FROM dish_order WHERE customer_id=? AND order_id=?',
                    [data.customer_id, orderId],
                    callback
                )
            },
            getAllOrders: function(data, callback) {
                return db.query(
                    'SELECT * FROM dish_order WHERE customer_id=?',
                    [data.customer_id],
                    callback
                )
            },

            getOrderData: function(orderId, callback) {
                return db.query(
                    'SELECT dish.dish_name AS Product, dish.price AS Price, dish_data.dish_amount AS Quantity FROM dish INNER JOIN dish_data ON dish.dish_id=dish_data.dish_id WHERE dish_data.order_id=?',
                    [orderId],
                    callback
                )
            },
        
     
      
        
    }


module.exports = customer;