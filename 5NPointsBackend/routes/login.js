const express = require('express'),
  User = require('../models/User'),
  randToken = require('rand-token');

var router = express.Router();

router.post('/login', (req, res) => {
  if(!req.body.username || !req.body.password) {
    res.send({
      success: false,
      message: 'Username or password not received'
    });
  }
  else {
    User.findOne({username: req.body.username}, (err, user) => {
      if(err || user == null) {
        res.send({
          success: false,
          message: 'Couldn\'t find a user with that username'
        });
      }
      else {
        user.comparePassword(req.body.password, (matches) => {
          if(!matches) {
            res.send({
              success: false,
              message: 'Username or password is incorrect'
            });
          }
          else {
            // Create token
            if(!true) { // Token somehow failed..
              res.send({
                success: false,
                message: 'Error logging in the user'
              })
            }
            else {
              var tokenData = randToken.generate(16);
              var token = jwt.sign({
                exp: Math.floor((Date.now() / 1000) + (60 * 60)),
                data: tokenData
              }, 'purduecs');
              user.update({tokenData: tokenData}, function(err) {
                if(err) {
                  res.send({
                    success: false,
                    message: 'Error creating token',
                  });
                }
                else {
                  res.json({
                    success: true,
                    message: 'User logged in',
                    id: user._id,
                    token: token
                  });
                }
              })
            }
          }
        })
      }
    })
  }
})

module.exports = router;
