/* 
File name: server.js
Student Name: Chadwick Lapis
StudentID: 300800490
Date: 11/12/2020
*/

let express = require("express");
let router = express.Router();
let passport = require("passport");

// connect the survey model
let surveyModel = require("../models/survey");
let Survey = surveyModel.Model; // alias

//Render survey-list View

module.exports.DisplaySurveyListPage = (req, res, next) => {

  Survey.find({ OwnerID: req.user._id }, (err, surveys) => {
    if (err) {
      return console.error(err);
    } else {
      let results = [];
      for (let survey of surveys) {
        let temp = {
          SurveyName: survey.SurveyName,
          ExpireDate: survey.ExpireDate,
          IsActive: survey.IsActive,
          updatedAt: dateFormat(survey.updatedAt),
          createdAt: dateFormat(survey.createdAt),
          SurveyIsActive: survey.IsActive,
          _id: survey._id,
        };

        results.push(temp);
      }
      res.render("content/survey-list", {
        title: "Survey",
        surveys: results,
        displayName: req.user ? req.user.displayName : "",
      });
    }
  });
};

function dateFormat(msg) {
  var date = new Date(msg);
  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toString().padStart(2, "0"); //padStart()是ES6的新方法，即设置字符串的长度，不足的用第二个参数补充 --> padStart() is a new method of ES6, that is, to set the length of the string, if it is insufficient, use the second parameter to supplement
  var day = date.getDate().toString().padStart(2, "0");
  var hour = date.getHours();
  var min = date.getMinutes().toString().padStart(2, "0");
  var second = date.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day}  ${hour}:${min}:${second}`; //这个不是单引号，而是tab键上面的键 --> This is not a single quote, but the key above the tab key
}

module.exports.DisplaySurveyQuestionPage = (req, res, next) => {
  let id = req.params.id;

  Survey.findById(id, (err, survey) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.render("content/survey-question", {
        title: "",
        displayName: req.user ? req.user.displayName : "",
        survey: survey,
      });
    }
  });
};

module.exports.ProcessSurveyQuestionPage = (req, res, next) => {
  res.redirect("/");
};

module.exports.DisplaySurveyCreatePage = (req, res, next) => {
  res.render("content/survey-create", {
    title: "Create a Survey",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.ProcessSurveyCreatePage = (req, res, next) => {

    let newSurvey = Survey({
    SurveyName: req.body.SurveyName,
    OwnerID: req.user._id,

    IsActive: req.body.IsActive,
    ExpireDate: req.body.ExpireDate,

    "QuestionObject1.Question": req.body.QuestionObject1Question,
    // Each one of those requests is one of the choices in the array, Not sure how to pass in a array from the EJs File
    "QuestionObject1.Choices": [
      req.body.QuestionObject1Choice1,
      req.body.QuestionObject1Choice2,
      req.body.QuestionObject1Choice3,
      req.body.QuestionObject1Choice4,
    ],

    "QuestionObject2.Question": req.body.QuestionObject2Question,
    // Each one of those requests is one of the choices in the array, Not sure how to pass in a array from the EJs File
    "QuestionObject2.Choices": [
      req.body.QuestionObject2Choice1,
      req.body.QuestionObject2Choice2,
      req.body.QuestionObject2Choice3,
      req.body.QuestionObject2Choice4,
    ],

    "QuestionObject3.Question": req.body.QuestionObject3Question,
    // Each one of those requests is one of the choices in the array, Not sure how to pass in a array from the EJs File
    "QuestionObject3.Choices": [
      req.body.QuestionObject3Choice1,
      req.body.QuestionObject3Choice2,
      req.body.QuestionObject3Choice3,
      req.body.QuestionObject3Choice4,
    ],
  });

  Survey.create(newSurvey, (err, Survey) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      return res.redirect("/survey-list");
    }
  });
};

module.exports.DisplaySurveyEditPage = (req, res, next) => {
  let id = req.params.id;

  Survey.findById(id, (err, survey) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.render("content/survey-edit", {
        title: "Edit a Survey",
        displayName: req.user ? req.user.displayName : "",
        survey: survey,
      });
    }
  });
};

//post
module.exports.ProcessSurveyEditPage = (req, res, next) => {
  let id = req.params.id;
  
  let updatedSurvey = Survey({
    _id: id,
    SurveyName: req.body.SurveyName,
    OwnerID: req.user._id,

    IsActive: req.body.IsActive,   
    ExpireDate: req.body.ExpireDate,

    "QuestionObject1.Question": req.body.QuestionObject1Question,
    // Each one of those requests is one of the choices in the array, Not sure how to pass in a array from the EJs File
    "QuestionObject1.Choices": [
      req.body.QuestionObject1Choice1,
      req.body.QuestionObject1Choice2,
      req.body.QuestionObject1Choice3,
      req.body.QuestionObject1Choice4,
    ],

    "QuestionObject2.Question": req.body.QuestionObject2Question,
    // Each one of those requests is one of the choices in the array, Not sure how to pass in a array from the EJs File
    "QuestionObject2.Choices": [
      req.body.QuestionObject2Choice1,
      req.body.QuestionObject2Choice2,
      req.body.QuestionObject2Choice3,
      req.body.QuestionObject2Choice4,
    ],

    "QuestionObject3.Question": req.body.QuestionObject3Question,
    // Each one of those requests is one of the choices in the array, Not sure how to pass in a array from the EJs File
    "QuestionObject3.Choices": [
      req.body.QuestionObject3Choice1,
      req.body.QuestionObject3Choice2,
      req.body.QuestionObject3Choice3,
      req.body.QuestionObject3Choice4,
    ]
  });

  Survey.updateOne({ _id: id }, updatedSurvey, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/survey-list");
    }
  });
};

module.exports.DisplaySurveyDeletePage = (req, res, next) => {
  let id = req.params.id;

  Survey.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/survey-list");
    }
  });
};
