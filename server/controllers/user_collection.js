/* 
File name: user_collection.js
Student Name: Joseph Volpe
StudentID: 301118010
Date: 10/22/2020
*/

let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');

let User_collection = require('../models/component');

module.exports.DisplayComponentList = (req, res, next) => {
  
    User_collection.Model.find( (err, data) => {
      if(err)
      {
        console.error(err);
        res.end()
      }
  
      res.render('index', { title: 'User Collection', User_collection: data ,
      displayName: req.user ? req.user.displayName : ''});
    });
    
  }

module.exports.DisplayAddPage = (req, res, next)=> {
    res.render('index', { title: 'Add Component' });
}

module.exports.ProcessAddPage = (req, res, next)=> {

    // instantiate a new object of type Component
    let component = Component.Model({
        "partID":req.body.partID,
        "name": req.body.name,
        "description": req.body.description,
        "price": req.body.price
    });

    Component.Model.create(component, (err, Component) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.redirect('/component-list');
    });
}

module.exports.DisplayEditPage = (req, res, next)=> {
    let id = req.params.id;

    // pass id to the db 
    Component.Model.findById(id, (err, ComponentToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        // show the edit view
        res.render('index', { title: 'Edit Component', data: ComponentToEdit,
        displayName: req.user ? req.user.displayName : '' });
    });
}

module.exports.ProcessEditPage = (req, res, next)=> {
    let id = req.params.id;

     // instantiate a new object of type Component
     let updatedComponent = Component.Model({
        "_id": id, 
        "partID":req.body.partID,
        "name": req.body.name,
        "description": req.body.description,
        "price": req.body.price
    });

    Component.Model.updateOne({_id: id}, updatedComponent, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.redirect('/component-list');
    });
}

module.exports.ProcessDeletePage = (req, res, next)=> {
    let id = req.params.id;

    Component.Model.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.redirect('/component-list');
    });
}