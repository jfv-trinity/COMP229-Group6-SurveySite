/* 
File name: component.js
Student Name: Joseph Volpe
StudentID: 301118010
Date: 10/22/2020
*/

let express = require('express');
let router = express.Router();
let moongoose = require('mongoose');

let passport = require('passport');

//helper function for authentication guard
function requiredAuth(req, res, next)
{
    //check if user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

let componentController = require('../controllers/component');

/* GET Component-list page. READ */
router.get('/', componentController.DisplayComponentList);
  
/* GET Display Add page. CREATE  */
router.get('/add', requiredAuth, componentController.DisplayAddPage);

/* POST process the Add page. CREATE */
router.post('/add', requiredAuth, componentController.ProcessAddPage);

/* GET Display Edit page. UPDATE */
router.get('/edit/:id', requiredAuth, componentController.DisplayEditPage);

/* POST process the Edit page. UPDATE */
router.post('/edit/:id', requiredAuth, componentController.ProcessEditPage);

/* GET process the Delete page. DELETE */
router.get('/delete/:id', requiredAuth, componentController.ProcessDeletePage);


module.exports = router;