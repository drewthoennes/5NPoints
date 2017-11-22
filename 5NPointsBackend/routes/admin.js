const express = require('express'),
  User = require('../models/User'),
  Point = require('../models/Point')
  session = require('express-session'),
  mongoose = require('mongoose');

var router = express.Router();

router.post('/admin', (req, res) => {
  //console.log(req.session);
  res.send({
    success: true,
    message: 'User has privileges'
  })
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
