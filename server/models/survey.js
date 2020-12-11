/* 

File name: survey.js
Date: 12/11/2020
Description: Model for surveys.

*/


//Model variables
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Model = mongoose.model;


//Model Structure
let SurveySchema = Schema({
    SurveyName: String,
    OwnerID: String, // The ID of the owner (Used for displaying the database owner in the surveyList)
    StartDate: Date,
    ExpireDate: Date,

    // An array of question objects    
    QuestionObject1: 
    { 
        Question : String, // The question being asked
        Choices: [String], // The question choices
    },    
    QuestionObject2: 
    { 
        Question : String, // The question being asked
        Choices: [String], // The question choices
    },
    QuestionObject3:   
    { 
        Question : String, // The question being asked
        Choices: [String], // The question choices
    }    
},
{
    collection: 'surveys',
    timestamps: true 
});


//Processes the model information
module.exports.Model = Model('Survey', SurveySchema);