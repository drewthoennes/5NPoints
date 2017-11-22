const express = require('express'),
  config = require('../config'),
  User = require('../models/User')

var router = express.Router();

router.get('/api', (req, res) => {
  res.send('5NPoints API');
})

router.get('/api/points', (req, res) => {
  res.send([
    {
      name: 'Drew Thoennes',
      points: 10
    },
    {
      name: 'Aashir Aumir',
      points: 13
    },
    {
      name: 'Elnard Utiushev',
      points: 19
    }
  ]);
})

router.get('/api/rewards', (req, res) => {
  res.send([
    {
      points: 1,
      reward: 'Get a bedtime story from Zach'
    },
    {
      points: 60,
      reward: 'Zach\'s Snapchat'
    }
  ]);
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
