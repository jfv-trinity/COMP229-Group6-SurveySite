/* 
File name: question.js
Student Name: Liam Nelski
StudentID: 3010642116
Date: 11/11/2020
*/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Model = mongoose.model;

let Question = Schema({
    Question: String,
    Answers: [{ type: String}],
    TotalAnswer: [{ type: Number }]
},
{
    collection: 'questions'
});

module.exports.Model = Model('Question', Question);
