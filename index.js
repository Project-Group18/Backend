const express = require('express')
const connection = require('./database');
var bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3001
var cors = require('cors')

//  Required for Login? Move to Login?
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


    //check if user has submitted both credentials
    if(email && password)
    {

      login.returnCustomer(email, function(err, result) {
        
          if(result[0] != undefined) {

        //if user is a customer
        login.checkCustomerPassword(email, function(err, result) 
        {
          console.log("user is a customer")
        if (err) { console.log(err)}
        else {
            if(result.length > 0) {

                  console.log("customer password")
                  console.log(result[0].customer_password)
                  console.log("user password")
                  console.log(password)

              bcrypt.compare(password, result[0].customer_password, function(err, compareResult) {
              if(err) {
                console.log(err)
              }
              if(compareResult) {
                console.log("Successful login")

                login.returnCustomer(email, function(err, result) {
                  if(err) {console.log(err)}
                    else{
                    console.log(result);
                    const user = {
                      id: result[0].customer_id,
                      name: result[0].customer_name,
                      email: result[0].customer_email
                    };
                      console.log("USER:")
                      console.log(user);
                      done(null, user);
                    }})
                }
              else {
                console.log("wrong password")
                done(null, false);
              }
              });
              }else {
                console.log("User doesn't exist")
                done(null, false);
                }
          }});
        } else {
          // if returnManager doesn't return undefined, we can authenticate
          login.returnManager(email, function(err, result) {
            if(result[0] != undefined) {
          //the user is a manager
          console.log("the user is a manager")
          login.checkManagerPassword(email, function(err, result) 
          {
          if (err) { console.log(err)}
          else {
              if(result.length > 0) {
                console.log("manager password:")
                console.log(result[0].manager_password)
                console.log("user password:")
                console.log(password)
                bcrypt.compare(password, result[0].manager_password, function(err, compareResult) {
                if(err) {
                  console.log(err)
                }
                if(compareResult) {
                  console.log("Successful login")
  
                  login.returnManager(email, function(err, result) {
                    if(err) {console.log(err)}
                      else{
                      console.log(result);
                      const user = {
                        id: result[0].manager_id,
                        name: result[0].manager_name,
                        email: result[0].manager_email,
                        restid: result[0].restaurant_id
                      };
                        console.log("USER:")
                        console.log(user);
                        done(null, user);
                      }})
                  }
                else {
                  console.log("wrong password")
                  done(null, false);
                }
                });
                }else {
                  console.log("User doesn't exist")
                  done(null, false);
                  }
            }});
          }})
        }
    })
    }
    else  {
      console.log("Username or password missing");
      done(null, false);
    }})
    );




//options to be used in the jwt passport
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


//request returns the Json web token we need in order to use a request
//the customer branch is now locked behind the jwt authentication


  //this requesst returns a jwt key we can then use to authenticate requests
  app.post('/jwtLogin', passport.authenticate('basic', {session:false}), (req, res) => {

      //console.log(req);
      //the data the JWT generation post will take to the requests it authenticates
      const payload = 
      {
        //this dataset can be used in all requests which use the jwt middleware passport
          user: 
          {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            restid: req.user.restid
          }
      };
      //the secret signing key shouldn't be normally be open in the code because it can be stolen
      const secretOrKey = "mysecretkey";
      const options = 
        {
          //token expiration date (now lasts 1 day)
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

var dishRouter = require('./routes/dish');
var orderRouter = require('./routes/order');
var categoryRouter = require('./routes/category');
*//* var managerRouter = require('./routes/manager'); */

//  Main routers here
var publicRouter = require('./routes/public');
var newUserRouter = require('./routes/newUser');
var loginRouter = require('./routes/login');
var managerRouter = require('./routes/manager');

//  for testing purposes...

var customerRouter = require('./routes/customer');

//  Again, placeholders...
/* 
app.use('/restaurant', restaurantRouter); 
app.use('/customer', passport.authenticate('basic', {session:false}), customerRouter); 
app.use('/login', loginRouter);

app.use('/dish', dishRouter);
app.use('/order', orderRouter);
app.use('/category', categoryRouter);
*/
/* app.use('/manager', managerRouter); */
//  Public data and new data, no jwt required
/*  For browsing available restaurants and their menus.  */
app.use('/public', publicRouter);
app.use('/new', newUserRouter);
app.use('/login', loginRouter);
app.use('/manager', passport.authenticate('jwt', {session:false}), managerRouter);

//  For testing purposes

app.use('/customer', passport.authenticate('jwt', {session:false}), customerRouter);

//  Login probably here, separate routes for both manager and customer?
/*  Cant probably use JWT authentication before login...  */ 

//  Functions needed by restaurant manager. JWT for manager required!
//app.use('/manager', manager);

//  Functions required for customer. JWT for customer required!
//app.use('/customer', customer);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
