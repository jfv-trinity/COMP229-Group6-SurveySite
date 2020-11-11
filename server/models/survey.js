/* 
File name: survey.js.js
Student Name: Liam Nelski
StudentID: 301064116
Date: 11/10/2020
*/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Model = mongoose.model;

let SurveySchema = Schema({
    ownerID: String,
    questions: [{ type: String}],    
},
{
    collection: 'surveys'
});

module.exports.Model = Model('Survey', SurveySchema);