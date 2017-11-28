const express = require('express'),
  User = require('../models/User'),
  Point = require('../models/Point')
  session = require('express-session'),
  //cookieSession = require('cookie-session'),
  mongoose = require('mongoose');

var router = express.Router();

router.post('/admin', (req, res) => {
  console.log(req.session.token);
  if(0 == 1) { // !req.session.token
    res.send({
      success: false,
      message: 'Token not found'
    })
  }
  else if(true) { // Check that token exists in database
    res.send({
      success: true,
      message: 'User has privilege'
    })
  }
})

router.post('/increment', (req, res) => {
  // Req needs token and username
  if(true) {  // If logged in user has token
    Point.findOneAndUpdate(
      {_id: mongoose.Types.ObjectId(req.body._id)}, {$inc: {"points": 1}}, (err, point) => {
        if(err) {
          res.send({
            success: false,
            message: 'Failed to increment points'
          });
        }
        else {
          res.send({
            success: true,
            message: 'Incremented points'
          });
        }
    });
  }
})

router.post('/decrement', (req, res) => {
  // Req needs token and username
  if(true) {  // If logged in user has token
    Point.findOneAndUpdate(
      {_id: mongoose.Types.ObjectId(req.body._id)}, {$inc: {"points": -1}}, (err, point) => {
        if(err) {
          res.send({
            success: false,
            message: 'Failed to decrement points'
          });
        }
        else {
          res.send({
            success: true,
            message: 'Decremented points'
          });
        }
    });
  }
})

module.exports = router;
