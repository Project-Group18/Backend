const mysql = require('mysql');
const connection = mysql.createPool({
    host:'eu-cdbr-west-01.cleardb.com',
    user:'b002b54b181543',
    password:'3da37abf',
    database:'heroku_f525f990b893a93'
});
module.exports = connection;
