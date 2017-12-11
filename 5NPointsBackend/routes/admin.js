const express = require('express'),
  User = require('../models/User'),
  Point = require('../models/Point')
  mongoose = require('mongoose'),
  jwt = require('jsonwebtoken');

var router = express.Router();

router.post('/admin', (req, res) => {
  User.findById(req.body.id, function(err, user) {
    if(err) { // Can't find user
      res.send({
        success: false,
        message: 'Error searching for user: ' + err
      });
    }
    else { // Check token
      jwt.verify(req.body.token, 'purduecs', function(err, decoded) {
        if(err) { // Error decoding
          res.send({
            success: false,
            message: 'Error decoding token: ' + err
          });
        }
        else {
          if(toString(decoded.data) !== toString(user.tokenData)) { // Tokens don't match
            res.send({
              success: false,
              message: 'Error logging in'
            });
          }
          else if(toString(decoded.data) === toString(user.tokenData)) {
            res.send({
              success: true,
              message: 'User has privilege'
            });
          }
        }
      })
    }
  })
})

module.exports = router;
