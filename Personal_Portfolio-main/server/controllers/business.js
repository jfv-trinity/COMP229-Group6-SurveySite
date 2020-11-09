/* 
File name: business.js
Student Name: Joseph Volpe
StudentID: 301118010
Date: 10/22/2020
*/

let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');

let Business = require('../models/business');

module.exports.DisplayBusinessList = (req, res, next) => {
  
    Business.Model.find( (err, data) => {
      if(err)
      {
        console.error(err);
        res.end()
      }

      sorted_data = data.sort((a, b) => a.name > b.name ? 1 : -1)

      res.render('index', { title: 'Business List', business_contacts: sorted_data ,
      displayName: req.user ? req.user.displayName : ''});
    });
  }

module.exports.DisplayAddPage = (req, res, next)=> {
    res.render('index', { title: 'Add Contact' });
}

module.exports.ProcessAddPage = (req, res, next)=> {

    // instantiate a new object of type Component
    let business = Business.Model({
        "name":req.body.name,
        "number": req.body.number,
        "email": req.body.email,
    });

    Business.Model.create(business, (err, Business) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.redirect('/business-list');
    });
}

module.exports.DisplayEditPage = (req, res, next)=> {
    let id = req.params.id;

    // pass id to the db 
    Business.Model.findById(id, (err, BusinessToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        // show the edit view
        res.render('index', { title: 'Edit Contacts', data: BusinessToEdit,
        displayName: req.user ? req.user.displayName : '' });
    });
}

module.exports.ProcessEditPage = (req, res, next)=> {
    let id = req.params.id;

     // instantiate a new object of type Component
     let updateBusiness = Business.Model({
        "_id": id, 
        "name":req.body.name,
        "number": req.body.number,
        "email": req.body.email,
    });

    Business.Model.updateOne({_id: id}, updateBusiness, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.redirect('/business-list');
    });
}

module.exports.ProcessDeletePage = (req, res, next)=> {
    let id = req.params.id;

    Business.Model.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.redirect('/business-list');
    });
}