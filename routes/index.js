var express = require('express');

var router = express.Router();
var posts = require('../db.json');
var request = require('request');

// var app = express();
// var reload = require('../../reload');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(posts);

  res.render('index', {
    title: "Home",
    posts: posts.posts
  });
});


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
    "Title": req.body.Title,
    "Author": req.body.Author,
    "dateTime": req.body.dateTime,
    "content": req.body.dateTime,

  }


  request.post({

    url: "http://localhost:8000/posts",
    body: obj,
    json: true

  }, function (error, response, body) {
   //timeout
  //  reload(app);
 res.redirect("/");

  });

});
































module.exports = router;