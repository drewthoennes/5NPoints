const express = require('express'),
  config = require('../config'),
  User = require('../models/User'),
  Point = require('../models/Point'),
  Reward = require('../models/Reward')

var router = express.Router();

router.get('/api', (req, res) => {
  res.send('5NPoints API');
})

router.get('/api/points', (req, res) => {
  Point.find({}, (err, points) => {
    if(err) {
      res.send({
        success: false,
        message: 'Couldn\'t retrieve points'
      });
    }
    else if(!points.length) {
      res.send({
        success: false,
        message: 'Couldn\'t retrieve points'
      });
    }
    else {
      res.json(points);
    }
  });
})

router.get('/api/rewards', (req, res) => {
  Reward.find({}, (err, rewards) => {
    if(err) {
      res.send({
        success: false,
        message: 'Couldn\'t retrieve rewards'
      });
    }
    else if(!rewards.length) {
      res.send({
        success: false,
        message: 'Couldn\'t retrieve rewards'
      });
    }
    else {
      res.json(rewards);
    }
  });
})

router.get('/api/users', (req, res) => {
  User.find({}, (err, users) => {
    if(err) {
      res.send('Error querying for users');
    }
    else if(!users.length) {
      res.send('No users found');
    }
    else {
      res.json(users);
    }
  })
})

module.exports = router;
