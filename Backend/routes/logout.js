const express = require('express'),
  User = require('../models/User');

var router = express.Router();

router.post('/logout', (req, res) => {
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
          if(decoded.data.trim() !== user.tokenData.trim()) { // Tokens don't match
            res.send({
              success: false,
              message: 'Error logging in'
            });
          }
          else if(decoded.data.trim() === user.tokenData.trim()) {
            user.tokenData = '';
            res.send({
              success: true,
              message: 'Successfully logged out'
            })
          }
        }
      })
    }
  })
})

module.exports = router;
