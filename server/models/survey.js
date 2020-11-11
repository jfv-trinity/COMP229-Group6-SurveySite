/* 
File name: survey.js.js
Student Name: Liam Nelski
StudentID: 3010
Date: 10/21/2020
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

module.exports.Model = Model('Survey', UserSchema);