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
    res.send("Welcome to the backend frontpage! Try writing /restaurant or /customer to see what the database has to offer. ");
});

//  Left here as placeholders for now...
/* 
var restaurantRouter = require('./routes/restaurant');
var customerRouter = require('./routes/customer');
var loginRouter = require('./routes/login');
var managerRouter = require('./routes/manager');
var dishRouter = require('./routes/dish');
var orderRouter = require('./routes/order');
var categoryRouter = require('./routes/category');
*/

//  Main routers here
var publicRouter = require('./routes/public')
var newUserRouter = require('./routes/newUser')


//  for testing purposes...
var customerRouter = require('./routes/customer')
var managerRouter = require('./routes/manager');

//  Again, placeholders...
/* 
app.use('/restaurant', restaurantRouter); 
app.use('/customer', passport.authenticate('basic', {session:false}), customerRouter); 
app.use('/login', loginRouter);
app.use('/manager', managerRouter);
app.use('/dish', dishRouter);
app.use('/order', orderRouter);
app.use('/category', categoryRouter);
*/

//  Public data, no jwt required
/*  For browsing available restaurants and their menus.  */
app.use('/public', publicRouter);
app.use('/new', newUserRouter);

//  For testing purposes
app.use('/customer', customerRouter);
app.use('/manager', managerRouter);

//  Login probably here, separate routes for both manager and customer?
/*  Cant probably use JWT authentication before login...  */ 

//  Functions needed by restaurant manager. JWT for manager required!
//app.use('/manager', manager);

//  Functions required for customer. JWT for customer required!
//app.use('/customer', customer);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
