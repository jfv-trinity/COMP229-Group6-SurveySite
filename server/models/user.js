/* 
File name: user.js
Student Name: Joseph Volpe
StudentID: 301118010
Date: 10/21/2020
*/

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');
let Schema = mongoose.Schema;
let Model = mongoose.model;

let UserSchema = Schema({
   username: String,
   //password: string,
   email: String,
   displayName: String
},
{
    collection: 'users'
});

// configure options for User Model

let options = ({missingPasswordError: 'Wrong / Missing Password'});

UserSchema.plugin(passportLocalMongoose, options);

module.exports.Model = Model('User', UserSchema);