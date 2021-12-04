const db = require('../database');

        
    const customer = 
    {
        postNewOrder: function(data, callback) {
            return db.query(
                'INSERT INTO dish_order (total_price, message, order_status, customer_id, restaurant_id, order_arrival_time) VALUES (?,?,?,?,?,?)',
                [data.total_price, data.message, "Pending", data.customer_id, data.restaurant_id, "CURDATE"],
                callback
            )
        },
        getNewOrderId: function(data, callback) {
            return db.query(
                'SELECT order_id FROM dish_order WHERE customer_id=? ORDER BY order_arrival_time LIMIT 1',
                [data.customer_id],
                callback
            )
        },
        postNewOrderData: function(data, orderId, callback) {
            data.items.forEach(item => {
                return db.query(
                    'INSERT INTO dish_data (order_id, dish_id, dish_amount) VALUES (?,?,?)',
                    [orderId, item.dish_id, item.dish_amount],
                    callback
                )
            });
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
        updateOrder: function(data, callback) {
            return db.query(
                'UPDATE dish_order SET order_status=? WHERE (order_id=? AND customer_id=?)',
                ["Complete", data.order_id, data.customer_id],
                callback
            )
        }
    }


module.exports = customer;