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

/* GET home page. */
router.get('/', indexController.DisplayHomePage);

/* GET home page. */
router.get('/home', indexController.DisplayHomePage);

/* GET Survey List page. */
router.get('/surveylist', surveyController.DisplaySurveyListPage);

/* GET Create Survey page. */
router.get('/surveycreate', surveyController.DisplaySurveyCreatePage);

// Post process create page
router.post('/surveycreate', surveyController.ProcessSurveyCreatePage);

/* GET Edit Survey page. */
router.get('/surveyedit/:id', surveyController.DisplaySurveyEditPage);

// Post process edit page
router.post('/surveyedit/:id', surveyController.ProcessSurveyEditPage);

/* GET Delete Survey page. */
router.get('/delete/:id', surveyController.DisplaySurveyDeletePage);

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
