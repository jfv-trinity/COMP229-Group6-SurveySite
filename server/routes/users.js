/* 

File name: user.js
Date: 12/11/2020
Description: routes for users.

*/


//user variables
let express = require('express');
let router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
