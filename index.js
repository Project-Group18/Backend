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
    res.send("Welcome to the backend frontpage! Try writing /restaurant or /customer to see what the database has to offer.");
});
var restaurantRouter = require('./routes/restaurant');
var customerRouter = require('./routes/customer');
var loginRouter = require('./routes/login');

app.use('/restaurant', restaurantRouter); 
app.use('/customer', customerRouter); 
app.use('/login', loginRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
