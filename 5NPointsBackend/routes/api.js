const express = require('express'),
  config = require('../config'),
  User = require('../models/User'),
  Point = require('../models/Point'),
  Reward = require('../models/Reward')

var router = express.Router();

router.get('/', (req, res) => {
  res.send('5NPoints Backend');
})

router.get('/api', (req, res) => {
  res.send('5NPoints API');
})

router.get('/api/points', (req, res) => {
  Point.find({}).sort({name: 1}).exec((err, points) => {
    if(err) {
      res.send({
        success: false,
        message: 'Couldn\'t retrieve points: ' + err
      });
    }
    else if(!points.length) {
      res.send({
        success: false,
        message: 'No points found'
      });
    }
    else {
      res.json(points);
    }
  });
})

router.get('/api/rewards', (req, res) => {
  Reward.find({}).sort({points: 1}).exec((err, rewards) => {
    if(err) {
      res.send({
        success: false,
        message: 'Couldn\'t retrieve rewards: err'
      });
    }
    else if(!rewards.length) {
      res.send({
        success: false,
        message: 'No rewards found'
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
      res.send('Couldn\'t retrieve users: ' + err);
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
