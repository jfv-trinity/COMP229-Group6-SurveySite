/* 

File name: user.js
Date: 12/11/2020
Description: Model for user.

*/


//user variables
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');
let Schema = mongoose.Schema;
let Model = mongoose.model;


//Model Structure
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