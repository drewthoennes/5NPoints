const express = require('express'),
  User = require('../models/User'),
  //session = require('express-session'),
  cookieSession = require('cookie-session');

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
            // Create session and token
            console.log(req.session);
            req.session.token = 'THISISMYTOKEN';
            console.log(req.session);
            req.session.save();
            if(!req.session.token) {
              res.send({
                success: false,
                message: 'Error logging in the user'
              })
            }
            else {
              res.send({
                success: true,
                message: 'User logged in'
              });
            }
          }
        })
      }
    })
  }
})

module.exports = router;
