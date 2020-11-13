/* 
File name: server.js
Student Name: Chadwick Lapis
StudentID: 300800490
Date: 11/12/2020
*/

let express = require('express');
let router = express.Router();
let passport = require('passport');

// connect the user model
let userModel = require('../models/user');
let User = userModel.Model; // alias

module.exports.DisplayHomePage = (req, res, next) => {

  console.log("Home Page Controller");

  res.render('index', { title: 'Home',
  displayName: req.user ? req.user.displayName : '' 
  });
}

module.exports.DisplayLoginPage = (req, res, next) => {
  // check if the user is already logged in
  if(!req.user)
  {
    // display login page
    res.render('auth/login', 
    {
      title: 'Login',
      messages: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
  }
  else
  {
    return res.redirect('/');
  }
}

module.exports.ProcessLoginPage = (req, res, next) => {
  passport.authenticate('local', 
  (err, user, info) => {
    // server error?
    if(err)
    {
      console.log(err);
      return next(err);
    }

    // is there a user login error?
    if(!user)
    {
      req.flash('loginMessage', 'Authentication Error');
      return res.redirect('/login');
    }

    req.logIn(user, (err) => {
      // db server err?
      if(err)
      {
        console.log(err);
        return next(err);
      }

      return res.redirect('/surveylist')
    });
  })(req, res, next);
}

module.exports.DisplayRegisterPage = (req, res, next) => {
  // check if the user is not already logged in
  if(!req.user)
  {
    res.render('auth/register',
    {
      title: 'Register',
      messages: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
  }
  else
  {
    return res.redirect('/');
  }
}

module.exports.ProcessRegisterPage = (req, res, next) =>
{
  // instantiate a new  user object
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName
  });

  User.register(newUser, req.body.password, (err) => {
    if(err)
    {
      console.log("Error: Inserting New User");
      if(err.name == "UserExistsError")
      {
        req.flash('registerMessage', 'Registration Error: an error occurred');
        console.log('Error: Registry error');
      }
      return res.render('auth/register', {
        title: 'Register',
        messages: req.flash('registerMessage'),
        displayName: req.user ? req.user.displayName : ''
      });
    }
    else
    {
      // if no error exists, the registration is successful

      // redirect the user and authenticate them

      // choice 1 - redirect user back to login page

      // choice 2 - authenticate them and then redirect them

      return passport.authenticate('local')(req, res, () => {
        res.redirect('/component-list');
      });
    }
  });
}

module.exports.PerformLogout = (req, res,next) => {
  req.logout();
  res.redirect('/');
}
