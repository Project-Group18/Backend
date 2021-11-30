const login = require('./models/login_model');
const bcrypt = require('bcrypt');
const BasicStrategy = require('passport-http').BasicStrategy;
const passport = require('passport');


module.exports = passport.use(new BasicStrategy(

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