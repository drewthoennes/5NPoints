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
          if(decoded.data.trim() !== user.tokenData.trim()) { // Tokens don't match
            res.send({
              success: false,
              message: 'Error logging in'
            });
          }
          else if(toString(decoded.data).trim() === user.tokenData.trim()) {
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

router.post('/increment', (req, res) => {
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
            Point.findOneAndUpdate(
              {_id: mongoose.Types.ObjectId(req.body.pointId)}, {$inc: {"points": 1}}, (err, point) => {
                if(err) {
                  res.send({
                    success: false,
                    message: 'Failed to increment points: ' + err
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
        }
      })
    }
  })
})

router.post('/decrement', (req, res) => {
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
            Point.findOneAndUpdate(
              {_id: mongoose.Types.ObjectId(req.body.pointId)}, {$inc: {"points": -1}}, (err, point) => {
                if(err) {
                  res.send({
                    success: false,
                    message: 'Failed to decrement points: ' + err
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
        }
      })
    }
  })
})

module.exports = router;
