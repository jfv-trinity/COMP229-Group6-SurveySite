/* 
File name: user_collection.js
Student Name: Joseph Volpe
StudentID: 301118010
Date: 10/22/2020
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let User_collection = require('../models/user_collection')

/* GET users listing. */
router.get('/', (req, res, next) => {
  User_collection.find((err, UserList) => {
      if(err)
      {
          return console.error(err);
      }
      else
      {
          console.log(UserList)
      }
  })
});

module.exports = router;
