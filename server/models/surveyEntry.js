/* 
File name: survey.js    
Student Name: Liam Nelski
StudentID: 301064116
Date: 11/16/2020
*/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Model = mongoose.model;

let SurveyEntry = new Schema({
    SurveyID: String,
    UserID: String,
    QuestionResponse: [int] // an array with each index storeing the integer answer to the Question
},
{
    collection: "surveyEntry"
});

module.exports.Model = Model('SurveyEntry', SurveyEntry);