const login = require('./models/login_model');
const bcrypt = require('bcrypt');

const passport_customer = require('passport');
const CustomerBasicStrategy = require('passport-http').BasicStrategy

const CustomerJwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt

passport_customer.use(new CustomerBasicStrategy(
    function(username, password, done) {
        console.log("Username: " + username + "\nPassword: " + password);
        if(username && password) {
            login.checkCustomer(username, function(err, DBresult) {
                if(err) {
                    console.log(err);
                } else if (DBresult[0] != undefined) {
                    bcrypt.compare(password, DBresult[0].customer_password, function(err, compareResult) {
                        if(err) {
                            console.log(err);
                        } else if (compareResult) {
                            console.log("Login Success");
                            const user = {
                                id: DBresult[0].customer_id,
                                name: DBresult[0].customer_name,
                                email: DBresult[0].customer_email
                            };
                            console.log("USER:")
                            console.log(user);
                            done(null, user);
                        } else {
                            console.log("Wrong password");
                            done(null, false);
                        }
                    })
                } else {
                    console.log("User not found on DB.");
                    done(null, false);
                }
            })
        } else {
            console.log("Username or Password missing.");
            done(null, false);
        }
    }
))

const CustomerJwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "customerKey"
}

passport_customer.use(new CustomerJwtStrategy(
    CustomerJwtOptions, function(jwt_payload, done) {
        console.log("JWT IS VALID");
        console.log("payload is as follows:");
        console.log(jwt_payload);

        done(null, jwt_payload)
    }
))

module.exports = passport_customer;