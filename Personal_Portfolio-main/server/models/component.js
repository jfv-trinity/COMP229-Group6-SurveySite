/* 
File name: component.js
Student Name: Joseph Volpe
StudentID: 301118010
Date: 10/22/2020
*/

let mongoose = require('mongoose');
let Schema = mongoose.Schema; // alias
let Model = mongoose.model; // alias

let ComponentSchema = new Schema({
    partID: String,
    name: String,
    description: String,
    price: Number
},
{
    collection: 'components'
});

module.exports.Model = Model('Component', ComponentSchema);