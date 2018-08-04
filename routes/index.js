var express = require('express');

var router = express.Router();
var db = require('../db.json');

var request = require('request');



/* GET home page. */
router.get('/index', function (req, res, next) {
  // console.log(posts);

  res.render('index', {
    title: "Home",
    posts: db.posts
  });
});

/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login', {
    title: "login",
    users: db.users,
    message: false
  });
});


/* POST login page */
router.post('/', function (req, res, next) {

  var users = db.users;
  var username = req.body.username;
  var password = req.body.password;
  console.log("Username: " + username);
  console.log("Password: " + password);

  for (let i = 0; i < users.length; i++) {
    if (username == users[i].username && password == users[i].password) {
      // Need to create cookie
      console.log("Display message: Logged in succesfully");
      res.render('index', {
        title: "Home",
        posts: db.posts,
        message: "Succesful"
      });
      break;
    }
  }

    res.render('login', {
      title: "login",
      users: db.users,
      message: "Login failed. Please check your credentials and try again."
    });

});

/* GET signup page. */
router.get('/signup', function (req, res, next) {
  res.render('signup', {
    title: "signup"
  });
});



/* POST user to users. */
router.post('/signup', function (req, res, next) {

  // res.send(req.body);
  let obj = {
    "firstName": req.body.firstName,
    "lastName": req.body.lastName,
    "about": req.body.about,
    "username": req.body.username,
    "password": req.body.password
  };


  request.post({

    url: "http://localhost:8000/users",
    body: obj,
    json: true

  }, function (error, response, body) {

    res.redirect("/");

  });

});

/* GET archive page. */
router.get('/archive', function (req, res, next) {
  console.log(db.posts);

  res.render('archive', {
    title: "Home",
    posts: db.posts
  });
});

/* GET contact page. */
router.get('/contact', function (req, res, next) {

  res.render('contact', {
    title: "contact",
    posts: db.posts
  });
});


/* GET create page. */
router.get('/create', function (req, res, next) {
  // console.log(posts);

  res.render('create', {
    title: "create",
    message: false
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
    res.render('create', {
      title: "create",
      message: "Succesfully added new blog post!"
    });

  });

});


// // Route for view page
router.get('/:id', function (req, res, next) {
  //make a post request to our database
  request({
    uri: "http://localhost:8000/posts/" + req.params.id,
    method: "GET",
  }, function (error, response, body) {
    // console.log(JSON.parse(body));
    res.render('view', {
      posts: JSON.parse(body)
    });
  });
});




// UPDATE ROUTES
router.get('/update/:id', function (req, res, next) {

  //make a post request to our database
  request({
    uri: "http://localhost:8000/posts/" + req.params.id,
    method: "GET",
  }, function (error, response, body) {
    console.log(JSON.parse(body));
    //send a response message
    res.render('update', {
      message: false,
      posts: JSON.parse(body)
    });
  });

});

router.post('/update/:id', function (req, res, next) {
  request({
    uri: "http://localhost:8000/posts/" + req.params.id,
    method: "PATCH",
    form: {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    }
  }, function (error, response, body) {
    // console.log(body);
    //send a response message
    res.render('update', {
      message: 'Successfully Changed.',
      posts: JSON.parse(body)
    });
  });
});





// Route for delete 
/* GET create page. */
router.get('/delete/:id', function (req, res, next) {
  console.log(req.params.id)
  //make a post request to our database
  request({
    uri: "http://localhost:8000/posts/" + req.params.id,
    method: "DELETE",
  }, function (error, response, body) {
    // console.log(body);
    //send a response message

    let data = {
      message: 'Successfully Removed.',
    }

    res.redirect('/index');
  });
});



module.exports = router;