/* 

File name: surveyEntry.js
Date: 12/11/2020
Description: Model for surveyEntry.

*/


//surveyEntry variables
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Model = mongoose.model;

//Model Structure
let SurveyEntry = new Schema({
    SurveyID: String,
    UserID: String,
    QuestionResponse: [Number] // an array with each index storeing the integer answer to the Question
},
{
    collection: "surveyEntry"
});

//Processes Model
module.exports.Model = Model('SurveyEntry', SurveyEntry);