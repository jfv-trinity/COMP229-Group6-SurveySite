#!/usr/bin/env node

/* 
File name: server.js
Student Name: Chadwick Lapis
StudentID: 300800490
Date: 11/12/2020
*/


let express = require('express');
let router = express.Router();

let indexController = require('../controllers/server');
let surveyController = require('../controllers/survey');

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

/* GET home page. */
router.get('/', indexController.DisplayHomePage);

/* GET home page. */
router.get('/home', indexController.DisplayHomePage);

/* GET Survey page. */
//router.get('/survey', surveyController.DisplaySurveyPage);

/* GET Survey List page. */
router.get('/survey-list', requiredAuth, surveyController.DisplaySurveyListPage);

/* GET Create Survey page. */
router.get('/survey-create', requiredAuth, surveyController.DisplaySurveyCreatePage);

// Post process create page
router.post('/survey-create', requiredAuth, surveyController.ProcessSurveyCreatePage);

/* GET Edit Survey page. */
router.get('/survey-edit/:id', requiredAuth, surveyController.DisplaySurveyEditPage);

// Post process edit page
router.post('/survey-edit/:id', requiredAuth, surveyController.ProcessSurveyEditPage);

/* GET Delete Survey page. */
router.get('/survey-delete/:id', requiredAuth, surveyController.DisplaySurveyDeletePage);

/* GET - Display Login Page */
router.get('/login', indexController.DisplayLoginPage);

/* POST - Process Login Page */
router.post('/login', indexController.ProcessLoginPage);

/* GET - Display Register Page */
router.get('/register', indexController.DisplayRegisterPage);

/* POST - Process Register Page */
router.post('/register', indexController.ProcessRegisterPage);

/* GET to perform Logout */
router.get('/logout', indexController.PerformLogout);

module.exports = router;
