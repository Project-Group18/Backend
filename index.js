const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mysql = require('mysql')

//connection details delivertwist18
 const connection = mysql.createPool({
  host:'eu-cdbr-west-01.cleardb.com',
  user:'b002b54b181543',
  password:'3da37abf',
  database:'heroku_f525f990b893a93'
}) 



app.get('/', (req, res) => {
  connection.query("SELECT * from customer", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
