const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('../passport');

router.post('/', passport.authenticate('basic', {session:false}), (req, res) => {
    const payload = 
    {
        user: 
        {
          type: req.user.type,
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
          restid: req.user.restid
        }
    };
    //the secret signing key shouldn't be normally be open in the code because it can be stolen
    const secretOrKey = "secretOrKey";
    const options = 
      {
        expiresIn: '1d'
      }  
    const generatedJWT = jwt.sign(payload, secretOrKey, options)
    res.json({jwt: generatedJWT})
});



module.exports = router;


