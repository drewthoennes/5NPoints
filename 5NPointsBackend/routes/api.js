const express = require('express');

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

module.exports = router;
