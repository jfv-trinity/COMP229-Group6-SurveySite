/* 
File name: survey.js    
Student Name: Liam Nelski
StudentID: 301064116
Date: 11/16/2020
*/

let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Model = mongoose.Model;

let SurveyEntry = new Schema({
    SurveyID: String,
    UserID: String,
    Question1: int,
    Question2: int,
    Question3: int
},
{
    collection: "surveyEntry"
});