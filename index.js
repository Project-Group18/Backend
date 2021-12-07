const express = require('express')
const connection = require('./database');
var bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3001
var cors = require('cors')

const passport_manager = require('./passport_manager');
const passport_customer = require('./passport_customer');

app.use(cors());
app.use(bodyParser.json());

//for testing purposes
app.get('/', (req, res) => {
    res.send("Welcome to the backend frontpage! Try writing /restaurant or /customer to see what the database has to offer. ");
});

//  Main Routers here
var publicRouter = require('./routes/public');
var newUserRouter = require('./routes/newUser');
var loginRouter = require('./routes/login');
var managerRouter = require('./routes/manager');
var customerRouter = require('./routes/customer');

app.use('/public', publicRouter);
app.use('/new', newUserRouter);
app.use('/login', loginRouter);
app.use('/manager', passport_manager.authenticate('jwt', {session:false}), managerRouter);
app.use('/customer', passport_customer.authenticate('jwt', {session:false}), customerRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
