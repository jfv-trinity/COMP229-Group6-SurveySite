/* 
File name: survey.js.js
Student Name: Liam Nelski
StudentID: 3010642116
Date: 11/10/2020
*/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Model = mongoose.model;

let Question = Schema({
    SurveyID : String,
    Question: String,
    Answers: [{ type: String}],
    TotalAnswer: [{ type: Number }]
},
{
    collection: 'questions'
});

module.exports.Model = Model('Question', Question);