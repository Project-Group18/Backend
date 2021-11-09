const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mysql = require('mysql')

//connection details delivertwist18
/* const connection = mysql.createConnection({
  host:'eu-cdbr-west-01.cleardb.com',
  user:'b002b54b181543',
  password:'3da37abf',
  database:'heroku_f525f990b893a93'
}) */


//connection details delivertwistt18
const connection = mysql.createConnection({
  host:'eu-cdbr-west-01.cleardb.com',
  user:'b02b9eff68ed9d',
  password:'ecfca0f4',
  database:'heroku_8de5a5a6f07908e'
})

connection.query('SELECT * FROM customer WHERE customer_id="5"', (error, data) => {

  if (error) throw error;

  if(!error) {
    console.log(data);
  }

})



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})