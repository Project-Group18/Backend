const login = require('./models/login_model');
const bcrypt = require('bcrypt');

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy

const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt

passport.use(new BasicStrategy(
    function(username, password, done) {
        console.log("Username: " + username + "\nPassword: " + password);
        if(username && password) {
            console.log("Checking customer...")
            login.checkCustomer(username, function(err, DBresult) {
                if(err) {
                    console.log(err);
                } else if (DBresult[0] != undefined) {
                    console.log("Customer found.\nChecking Login details...")
                    bcrypt.compare(password, DBresult[0].customer_password, function(err, compareResult) {
                        if(err) {
                            console.log(err);
                        } else if (compareResult) {
                            console.log("Login Success");
                            const user = {
                                type: "Customer",
                                id: DBresult[0].customer_id,
                                name: DBresult[0].customer_name,
                                email: DBresult[0].customer_email,
                                restid: null
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
                    console.log("Customer not found on DB.");
                    //done(null, false);
                    console.log("Checking manager...")
                    login.checkManager(username, function(err, DBresult) {
                        if(err) {
                            console.log(err);
                        } else if (DBresult[0] != undefined) {
                            console.log("Manager found.\nChecking Login details...")
                            bcrypt.compare(password, DBresult[0].manager_password, function(err, compareResult) {
                                if(err) {
                                    console.log(err);
                                } else if (compareResult) {
                                    console.log("Login Success");
                                    const user = {
                                        type: "Manager",
                                        id: DBresult[0].manager_id,
                                        name: DBresult[0].manager_name,
                                        email: DBresult[0].manager_email,
                                        restid: DBresult[0].restaurant_id
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
                            console.log("Manager not found on DB.");
                            done(null, false);
                        }
                    })
                }
            })
            
        } else {
            console.log("Username or Password missing.");
            done(null, false);
        }
    }
))

const JwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secretOrKey"
}

passport.use(new JwtStrategy(
    JwtOptions, function(jwt_payload, done) {
        console.log("JWT IS VALID");
        console.log("payload is as follows:");
        console.log(jwt_payload);

        done(null, jwt_payload)
    }
))

module.exports = passport;