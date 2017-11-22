const express = require('express');

var router = express.Router();

router.post('/admin', (req, res) => {
  // res.send({
  //   success: false,
  //   message: 'User doesn\'t have privileges'
  // });
  res.send({
    success: true,
    message: 'User doesn\'t have privileges'
  })
})

module.exports = router;
