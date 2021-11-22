const express = require('express')
const connection = require('./database');
var bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3001
var cors = require('cors')


const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
  function(username, password, done) {
    console.log('username: '+username+" password "+password);

    //search for the matching username
   
    done(null, username);

   
  }
));

app.use(cors());
app.use(bodyParser.json());

//for testing purposes
app.get('/', (req, res) => {
    res.send("Welcome to the backend frontpage! Try writing /restaurant or /customer to see what the database has to offer.");
});

var restaurantRouter = require('./routes/restaurant');
var customerRouter = require('./routes/customer');
var loginRouter = require('./routes/login');
var managerRouter = require('./routes/manager');

app.use('/restaurant', restaurantRouter); 
app.use('/customer', passport.authenticate('basic', {session:false}), customerRouter); 
app.use('/login', loginRouter);
app.use('/manager', managerRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
