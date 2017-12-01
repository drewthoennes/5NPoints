const express = require('express'),
  User = require('../models/User'),
  session = require('express-session'),
  cookieParser = require('cookie-parser');

var router = express.Router();

router.post('/logout', (req, res) => {
  //console.log(req.session.id);
  req.session.destroy(function(err) {
    if(err) {
      res.send({
        success: false,
        message: 'Couldn\'t destroy session'
      });
    }
    else {
      res.send({
        success: true,
        message: 'Destroyed session'
      });
    }
  });
})

module.exports = router;
