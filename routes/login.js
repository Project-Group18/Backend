const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport_customer = require('../passport_customer');
const passport_manager = require('../passport_manager');

router.post('/customer', passport_customer.authenticate('basic', {session:false}), (req, res) => {
    const payload = 
    {
        user: 
        {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
        }
    };
    //the secret signing key shouldn't be normally be open in the code because it can be stolen
    const secretOrKey = "customerKey";
    const options = 
      {
        expiresIn: '1d'
      }
    const generatedJWT = jwt.sign(payload, secretOrKey, options)
    res.json({jwt: generatedJWT})
});

router.post('/manager', passport_manager.authenticate('basic', {session:false}), (req, res) => {
    const payload = 
    {
        user: 
        {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
          restid: req.user.restid
        }
    };
    //the secret signing key shouldn't be normally be open in the code because it can be stolen
    const secretOrKey = "managerKey";
    const options = 
      {
        expiresIn: '1d'
      }
    const generatedJWT = jwt.sign(payload, secretOrKey, options)
    res.json({jwt: generatedJWT})
});

module.exports = router;


