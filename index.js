const express = require('express')
const connection = require('./database');
var bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3001
var cors = require('cors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt

//I was planning to move the passport to its own component,but it's not finished yet
/* const passport_customer = require('./passport_customer') */

const login = require('./models/login_model');

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
  function(email, password, done) {
    console.log('username: '+email+" password "+password);

    if(email && password)
    {
      const customer_password =password;
      login.checkPassword(email, function(err, result) 
      {
      if (err) {
          console.log(err)
      } else {
          if(result.length > 0) {
            bcrypt.compare(customer_password, result[0].customer_password, function(err, compareResult) {
          if(err) {
            console.log(err)
          }
          if(compareResult) {
            console.log("Successful login")
            /*   res.send(true); */
            done(null, email);
          }
          else {
            console.log("wrong password")
            /* res.send(false); */
            done(null, false);
          }
          });
          }else {
            console.log("User doesn't exist")
            /*   res.send(false); */
            done(null, false);
          }
          }} );
    }
    else  {
      console.log("Username or password missing");
      /* res.send("Username or password missing"); */
      /* res.send(false); */
      done(null, false);
    }})
  );

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "mysecretkey"
}

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
  console.log("JWT IS VALID");
  console.log("payload is as follows:");
  console.log(jwt_payload);

  done(null, jwt_payload)
}))

app.use(cors());
app.use(bodyParser.json());

//for testing purposes
app.get('/', (req, res) => {
    res.send("Welcome to the backend frontpage! Try writing /restaurant or /customer to see what the database has to offer. ");
});


//for testing purposes

app.post('/jwtLogin', passport.authenticate('basic', {session:false}), (req, res) => {

  //generate jwt web token 
  const payload = {
    foo: {
      bar:true
    }
  };

  const secretOrKey = "mysecretkey";
  const options = {
    expiresIn: '1d'
  }

  const generatedJWT = jwt.sign(payload, secretOrKey, options)
  //send jwt as response

  res.json({jwt: generatedJWT})

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
var loginRouter = require('./routes/login')

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
app.use('/login', loginRouter);


//  For testing purposes
/* app.use('/customer', passport.authenticate('basic', {session:false}), customerRouter); */
app.use('/customer', passport.authenticate('jwt', {session:false}), customerRouter);
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
