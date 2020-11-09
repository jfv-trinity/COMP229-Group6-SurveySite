/* 
File name: business.js
Student Name: Joseph Volpe
StudentID: 301118010
Date: 10/22/2020
*/

let mongoose = require('mongoose');
let Schema = mongoose.Schema; // alias
let Model = mongoose.model; // alias

let BusinessSchema= new Schema({
    name: String,
    number: Number,
    email: String,
},
{
    collection: 'contacts'
});

module.exports.Model = Model('Business_contacts', BusinessSchema);