/* 
File name: server.js
*/

let express = require("express");
let router = express.Router();
let passport = require("passport");

// connect the user model
let userModel = require("../models/user");
let User = userModel.Model; // alias

//survey model
let surveyModel = require("../models/survey");
let Survey = surveyModel.Model;

module.exports.DisplayHomePage = (req, res, next) => {
    Survey.find((err, surveys) => {
        if (err) {
            return console.error(err);
        } 
        else {
            let currentDateInMilisec = Date.now(); // Used for checking expirery
            let results = [];
            for (let survey of surveys) {
                let temp = {
                    SurveyName: survey.SurveyName,
                    StartDate: survey.StartDate,
                    ExpireDate: survey.ExpireDate,
                    IsActive: survey.IsActive,
                    _id: survey._id,
                };
                // Check if the the survey has expired or is not active before pushing to the displaylist
                
                //console.log(Date.parse(temp.ExpireDate) + " > " +  currentDate + " = ")
                //console.log(Date.parse(temp.ExpireDate) > currentDate);
                
                let startDateinMilisec = Date.parse(temp.StartDate);
                let expireDateinMilisec = Date.parse(temp.ExpireDate);

                console.log("Current date In miliseconds: " + currentDateInMilisec);
                console.log("Start date In miliseconds: " + startDateinMilisec);
                console.log("Expire date In miliseconds: " + expireDateinMilisec);

                if (expireDateinMilisec > currentDateInMilisec && startDateinMilisec < currentDateInMilisec) 
                {
                    console.log("'" + temp.SurveyName + "'" + " Survey Can be shown")
                    results.push(temp);
                }
            }

            res.render("index", {
                title: "Survey Fox",
                surveys: results,
                displayName: req.user ? req.user.displayName : "",
            });
        }
    });
};
// module.exports.DisplaySurveyListPage = (req, res, next) => {}
module.exports.DisplayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if (!req.user) {
        // display login page
        res.render("auth/login", {
            title: "Login",
            messages: req.flash("loginMessage"),
            displayName: req.user ? req.user.displayName : "",
        });
    } else {
        return res.redirect("/");
    }
};

module.exports.ProcessLoginPage = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        // server error?
        if (err) {
            console.log(err);
            return next(err);
        }

        // is there a user login error?
        if (!user) {
            req.flash("loginMessage", "Authentication Error");
            return res.redirect("/login");
        }

        req.logIn(user, (err) => {
            // db server err?
            if (err) {
                console.log(err);
                return next(err);
            }

            return res.redirect("/survey-list");
        });
    })(req, res, next);
};

module.exports.DisplayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if (!req.user) {
        res.render("auth/register", {
            title: "Register",
            messages: req.flash("registerMessage"),
            displayName: req.user ? req.user.displayName : "",
        });
    } else {
        return res.redirect("/");
    }
};

module.exports.ProcessRegisterPage = (req, res, next) => {
    // instantiate a new  user object
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName,
    });

    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log("Error: Inserting New User");
            if (err.name == "UserExistsError") {
                req.flash("registerMessage", "Registration Error: an error occurred");
                console.log("Error: Registry error");
            }
            return res.render("auth/register", {
                title: "Register",
                messages: req.flash("registerMessage"),
                displayName: req.user ? req.user.displayName : "",
            });
        } else {
            // if no error exists, the registration is successful

            // redirect the user and authenticate them

            // choice 1 - redirect user back to login page

            // choice 2 - authenticate them and then redirect them

            return passport.authenticate("local")(req, res, () => {
                res.redirect("/survey-list");
            });
        }
    });
};

module.exports.PerformLogout = (req, res, next) => {
    req.logout();
    res.redirect("/");
};
