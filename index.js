const express = require('express')
const db = require('./database');
var bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3001
var cors = require('cors')

app.use(cors());
app.use(bodyParser.json());


//for testing purposes
app.get('/', (req, res) => {
    res.send("Welcome to the main page! Try writing /restaurant or /customer to see what the database has to offer.");
});
var restaurantRouter = require('./routes/restaurant');
var customerRouter = require('./routes/customer');

app.use('/restaurant', restaurantRouter); 
app.use('/customer', customerRouter); 


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
