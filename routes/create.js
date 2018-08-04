var express = require('express');

var router = express.Router();
var posts = require('../db.json');
var request = require('request');

/* GET create page. */
router.get('/create', function (req, res, next) {
    // console.log(posts);
  
    res.render('create', {
      title: "create"
    });
    console.log(req.body);
  
  });
  
  
  /* POST to create page. */
  router.post('/create', function (req, res, next) {
  
    // res.send(req.body);
    let obj = {
      "title": req.body.title,
      "author": req.body.Author,
      "dateTime": req.body.dateTime,
      "content": req.body.dateTime,
      "img": req.body.img
    };
  
  
    request.post({
  
      url: "http://localhost:8000/posts",
      body: obj,
      json: true
  
    }, function (error, response, body) {
  
      res.redirect("/");
  
    });
  
  });