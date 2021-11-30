const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const login = require('../models/login_model');

router.post('/',
 function(req, res) {

    if(req.body.customer_email && req.body.customer_password){
        const customer_password = req.body.customer_password;

    login.checkPassword(req.body.customer_email, function(err, result) {
        if (err) {
            res.json(err);
        }
        else {
            if(result.length > 0) {
                bcrypt.compare(customer_password, result[0].customer_password, function(err, compareResult) {
                    if(err) {
                        //handle error
                        //*
                    }
                    if(compareResult) {
                        console.log("Successful login")
                        /* res.send("Successful login"); */
                        res.send(true);
                    }
                    else {
                        console.log("wrong password")
                        /* res.send("passwords don't match "+customer_password+ " and " + result[0].customer_password); */
                        res.send(false);
                    }
                    res.end();
                });
            }else {
                console.log("User doesn't exist")
                /* res.send("User doesn't exist"); */
                res.send(false);
            }
        }} );
    } else  {
        console.log("Username or password missing");
        /* res.send("Username or password missing"); */
        res.send(false);
    }
}
);


module.exports = router;


