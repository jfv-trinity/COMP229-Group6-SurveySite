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

module.exports.DisplayHomePage = (req, res, next) => {

  console.log("Home Page Controller");

  res.render('index', { title: 'Home',
  displayName: req.user ? req.user.displayName : '' 
  });
}
  
module.exports.DisplaySurveyPage = (req, res, next) => {
  res.render('survey', { title: 'Survey',
  displayName: req.user ? req.user.displayName : '' 
  });
}

module.exports.DisplaySurveyListPage = (req, res, next) => {
  res.render('surveylist', { title: 'Survey List',
  displayName: req.user ? req.user.displayName : '' 
  });
}

module.exports.DisplaySurveyCreatePage = (req, res, next) => {
  res.render('surveycreate', { title: 'Create a Survey',
  displayName: req.user ? req.user.displayName : '' 
  });

}
  
module.exports.ProcessSurveyCreatePage = (req, res, next) => {
  
  let newSurvey = Survey({
    "SurveyName": req.body.SurveyName,
    "OwnerID": req.body.OwnerID,
    "QuestionObject1.Question": req.body.QuestionObject1Question,
    "QuestionObject1.Choices": req.body.QuestionObject1Choices,
    "QuestionObject1.TotalAnswers": req.body.QuestionObject1TotalAnswers,
    "QuestionObject2.Question": req.body.QuestionObject2Question,
    "QuestionObject1.Choices": req.body.QuestionObject2Choices,
    "QuestionObject1.TotalAnswers": req.body.QuestionObject2TotalAnswers,
    "QuestionObject3.Question": req.body.QuestionObject3Question,
    "QuestionObject1.Choices": req.body.QuestionObject3Choices,
    "QuestionObject1.TotalAnswers": req.body.QuestionObject3TotalAnswers,
  });

  Survey.create(newSurvey, (err, Survey) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.redirect('/surveylist');
    }
  });
}
  
module.exports.DisplaySurveyEditPage = (req, res, next) => {
  res.render('surveyedit/:id', { title: 'Edit a Survey',
  displayName: req.user ? req.user.displayName : '' 
  });
}

module.exports.ProcessSurveyEditPage = (req, res, next) => {
  let id = req.params.id

  let updatedSurvey = Survey({
    "_id": id,
    "SurveyName": req.body.SurveyName,
    "OwnerID": req.body.OwnerID,
    "QuestionObject1.Question": req.body.QuestionObject1Question,
    "QuestionObject1.Choices": req.body.QuestionObject1Choices,
    "QuestionObject1.TotalAnswers": req.body.QuestionObject1TotalAnswers,
    "QuestionObject2.Question": req.body.QuestionObject2Question,
    "QuestionObject1.Choices": req.body.QuestionObject2Choices,
    "QuestionObject1.TotalAnswers": req.body.QuestionObject2TotalAnswers,
    "QuestionObject3.Question": req.body.QuestionObject3Question,
    "QuestionObject1.Choices": req.body.QuestionObject3Choices,
    "QuestionObject1.TotalAnswers": req.body.QuestionObject3TotalAnswers,
  });

  Survey.updateOne({_id: id}, updatedSurvey, (err) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        res.redirect('/surveylist');
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
          res.redirect('/surveylist');
        }
    });
};