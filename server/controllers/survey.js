/* 
File name: server.js
Student Name: Chadwick Lapis
StudentID: 300800490
Date: 11/12/2020
*/

let express = require('express');
let router = express.Router();
let passport = require('passport');

// connect the survey model
let surveyModel = require('../models/survey');
let Survey = surveyModel.Model; // alias

//Render survey-list View
/*
module.exports.DisplaySurveyPage = (req, res, next) => {

  res.render('content/survey', { title: 'Survey List',
  displayName: req.user ? req.user.displayName : '' 
  });
}
*/

module.exports.DisplaySurveyListPage = (req, res, next) => {
  
  Survey.find({OwnerID: req.user._id}, (err, surveys) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('content/survey-list',
      { 
        title: 'Survey',
        surveys: surveys,
        displayName: req.user ? req.user.displayName : ''
      });
    }
  });
}

module.exports.DisplaySurveyCreatePage = (req, res, next) => {
  res.render('content/survey-create', { title: 'Create a Survey',
  displayName: req.user ? req.user.displayName : '' 
  });

}
  
module.exports.ProcessSurveyCreatePage = (req, res, next) => {
  
  let newSurvey = Survey({
    "SurveyName": req.body.SurveyName,
    "OwnerID": req.user._id,
    
    "QuestionObject1.Question": req.body.QuestionObject1Question,
    // Each one of those requests is one of the choices in the array, Not sure how to pass in a array from the EJs File
    "QuestionObject1.Choices": [
        req.body.QuestionObject1Choice1,
        req.body.QuestionObject1Choice2,
        req.body.QuestionObject1Choice3,
        req.body.QuestionObject1Choice4
    ],
    // Instantiate the total Answers to 0000 as the survey is being created
    "QuestionObject1.TotalAnswers": [0,0,0,0],
    
    "QuestionObject2.Question": req.body.QuestionObject2Question,
    // Each one of those requests is one of the choices in the array, Not sure how to pass in a array from the EJs File
    "QuestionObject2.Choices": [
        req.body.QuestionObject2Choice1,
        req.body.QuestionObject2Choice2,
        req.body.QuestionObject2Choice3,
        req.body.QuestionObject2Choice4
    ],
    // Instantiate the total Answers to 0000 as the survey is being created
    "QuestionObject2.TotalAnswers": [0,0,0,0],

    "QuestionObject3.Question": req.body.QuestionObject3Question,
    // Each one of those requests is one of the choices in the array, Not sure how to pass in a array from the EJs File
    "QuestionObject3.Choices": [
        req.body.QuestionObject3Choice1,
        req.body.QuestionObject3Choice2,
        req.body.QuestionObject3Choice3,
        req.body.QuestionObject3Choice4
    ],
    // Instantiate the total Answers to 0000 as the survey is being created
    "QuestionObject3.TotalAnswers": [0,0,0,0],
  });

  Survey.create(newSurvey, (err, Survey) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      return res.redirect('/survey-list');
    }

  });
}
  
module.exports.DisplaySurveyEditPage = (req, res, next) => {
  let id = req.params.id;

  Survey.findById(id, (err, survey) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.render('content/survey-edit', 
      { 
        title: 'Edit a Survey',
        displayName: req.user ? req.user.displayName : '' ,
        survey: survey
      });
    }
  });
}

//post
module.exports.ProcessSurveyEditPage = (req, res, next) => {
  let id = req.params.id;

  let updatedSurvey = Survey({
    "_id": id,
    "SurveyName": req.body.SurveyName,
    "OwnerID": req.user._id,
    
    "QuestionObject1.Question": req.body.QuestionObject1Question,
    // Each one of those requests is one of the choices in the array, Not sure how to pass in a array from the EJs File
    "QuestionObject1.Choices": [
        req.body.QuestionObject1Choice1,
        req.body.QuestionObject1Choice2,
        req.body.QuestionObject1Choice3,
        req.body.QuestionObject1Choice4
    ],
    // Instantiate the total Answers to 0000 as the survey is being created
    "QuestionObject1.TotalAnswers": [0,0,0,0],
    
    "QuestionObject2.Question": req.body.QuestionObject2Question,
    // Each one of those requests is one of the choices in the array, Not sure how to pass in a array from the EJs File
    "QuestionObject2.Choices": [
        req.body.QuestionObject2Choice1,
        req.body.QuestionObject2Choice2,
        req.body.QuestionObject2Choice3,
        req.body.QuestionObject2Choice4
    ],
    // Instantiate the total Answers to 0000 as the survey is being created
    "QuestionObject2.TotalAnswers": [0,0,0,0],

    "QuestionObject3.Question": req.body.QuestionObject3Question,
    // Each one of those requests is one of the choices in the array, Not sure how to pass in a array from the EJs File
    "QuestionObject3.Choices": [
        req.body.QuestionObject3Choice1,
        req.body.QuestionObject3Choice2,
        req.body.QuestionObject3Choice3,
        req.body.QuestionObject3Choice4
    ],
    // Instantiate the total Answers to 0000 as the survey is being created
    "QuestionObject3.TotalAnswers": [0,0,0,0],
  });

  Survey.updateOne({_id: id}, updatedSurvey, (err) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        res.redirect('/survey-list');
    }
  });
};


module.exports.DisplaySurveyDeletePage = (req, res, next) => {
    let id = req.params.id;
  
    Survey.remove({_id: id}, (err) => {
        if(err)
        {
          console.log(err);
          res.end(err);
        }
        else
        {
          res.redirect('/survey-list');
        }
    });
};