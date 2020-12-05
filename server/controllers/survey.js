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

//connect the survey entry model
let surveyEntryModel = require("../models/surveyEntry");
let SurveyEntry = surveyEntryModel.Model; // alias


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
                    StartDate: formateDate(survey.StartDate),
                    ExpireDate: formateDate(survey.ExpireDate),
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

function formateDate(dateToBeFormated) {
    var date = new Date(dateToBeFormated);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, "0"); //padStart()is the new method of ES6, which is set the length of the string, the insufficient part will be supplemented with the second parameter
    var day = date.getDate().toString().padStart(2, "0");
    
    return `${year}-${month}-${day}`; 
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
  
  let id = req.params.id;
  

  SurveyEntry.findOne({SurveyID: id }, (err, surveyEntry) => {
    if (err) {
        console.log(err);
        res.end(err);
    } else {
      let QR = surveyEntry? surveyEntry.QuestionResponse : [0,0,0,0,0,0,0,0,0,0,0,0];

      //get radio value and increase the corresponding integer in the integer
      //Q1
      if (req.body.Q1 == 'a'){
        QR[0]++;
      }
      else if (req.body.Q1 == 'b'){
        QR[1]++;
      }
      else if (req.body.Q1 == 'c'){
        QR[2]++;
      }
      else if (req.body.Q1 == 'd'){
        QR[3]++;
      }
      //Q2
      if (req.body.Q2 == 'a'){
        QR[4]++;
      }
      else if (req.body.Q2 == 'b'){
        QR[5]++;
      }
      else if (req.body.Q2 == 'c'){
        QR[6]++;
      }
      else if (req.body.Q2 == 'd'){
        QR[7]++;
      }
      //Q3
      if (req.body.Q3 == 'a'){
        QR[8]++;
      }
      else if (req.body.Q3 == 'b'){
        QR[9]++;
      }
      else if (req.body.Q3 == 'c'){
        QR[10]++;
      }
      else if (req.body.Q3 == 'd'){
        QR[11]++;
      }

      if(surveyEntry){
        let updatedSurveyEntry = SurveyEntry({
            _id: surveyEntry._id,
            SurveyID: id,
            QuestionResponse: QR
          });
    
    
          SurveyEntry.updateOne({ SurveyID: id }, updatedSurveyEntry, (err) => {
            if (err) {
                console.log(err);
                res.end(err);
            } else {
                res.redirect("/");
            }
          });
      }
      else{
        let updatedSurveyEntry = new SurveyEntry({
            
            SurveyID: id,
            QuestionResponse: QR
          });
          updatedSurveyEntry.save((err,surveyEntry)=>{
              if(err){
                console.log(err);
                res.end(err);
              }
              else{
                  res.redirect('/')
              }
          })
      }

      
    }
  });
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

        StartDate: req.body.StartDate,
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
          let newSurveyEntry = SurveyEntry({
            SurveyID: Survey._id, //check if the survey id is entered in here
            QuestionResponse: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          });
      
          SurveyEntry.create(newSurveyEntry, (err, SurveyEntery) => {
            if (err) {
                console.log(err);
                res.end(err);
            } else {
                return res.redirect("/survey-list");
            }
        });
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
            if(req.user._id!=survey.OwnerID){
                return res.redirect("/");
            }
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

        StartDate: req.body.StartDate,
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
            SurveyEntry.remove({ SurveyID: id }, (err) => {
            if (err) {
                console.log(err);
                res.end(err);
            } else {
            res.redirect("/survey-list");
            }
          });
        }
    });
};

//edit survey result page to add functionality
module.exports.DisplaySurveyResultPage = (req, res, next) => {
    res.render("content/survey-result", {
        title: "Survey Results",
        displayName: req.user ? req.user.displayName : "",
    });
};