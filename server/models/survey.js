/* 
File name: survey.js    
Student Name: Liam Nelski
StudentID: 301064116
Date: 11/10/2020
*/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Model = mongoose.model;

let SurveySchema = Schema({
    ownerID: String, // The ID of the owner (Used for displaying the database owner in the surveyList)
    questions: // An array of question objects
    [
        { 
            Question : String, // The Question being asked
            Choices: [String], // The Choices of answer
            TotalAnswers : [Number] // The Number of times a choice has been picked
        }
    ],    
},
{
    collection: 'surveys'
});

module.exports.Model = Model('Survey', SurveySchema);