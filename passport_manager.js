const login = require('./models/login_model');
const bcrypt = require('bcrypt');

const passport_manager = require('passport');
const ManagerBasicStrategy = require('passport-http').BasicStrategy

const ManagerJwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt

passport_manager.use(new ManagerBasicStrategy(
    function(username, password, done) {
        console.log("Username: " + username + "\nPassword: " + password);
        if(username && password) {
            login.checkManager(username, function(err, DBresult) {
                if(err) {
                    console.log(err);
                } else if (DBresult[0] != undefined) {
                    bcrypt.compare(password, DBresult[0].manager_password, function(err, compareResult) {
                        if(err) {
                            console.log(err);
                        } else if (compareResult) {
                            console.log("Login Success");
                            const user = {
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
        } else {
            console.log("Username or Password missing.");
            done(null, false);
        }
    }
))

const ManagerJwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "managerKey"
}

passport_manager.use(new ManagerJwtStrategy(
    ManagerJwtOptions, function(jwt_payload, done) {
        console.log("JWT IS VALID");
        console.log("payload is as follows:");
        console.log(jwt_payload);

        done(null, jwt_payload)
    }
))

module.exports = passport_manager;