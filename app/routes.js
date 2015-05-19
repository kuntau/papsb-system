// routes.js

var Todo = require('./models/todo');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('routes.js --> user is authenticated');
    return next();
  }

  console.log('routes.js --> user not logged in');
  // res.redirect(401, '/index.html');
  // res.sendStatus('401');
  // res.sendFile('./public/index.html', { root: __dirname + '/..' });
  return next();
}

module.exports = function(app, passport) {

  // api -------------
  // get all todos
  app.get('/api/todos', function(req, res) {

    // use mongoose to get all todos in the database
    Todo.find(function(err, todos) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        res.send(err);

      res.json(todos); // return all todos in JSON format
    });
  });

  // insert a todo
  app.post('/api/todos', function(req, res) {

    // create a todo, information comes from AJAX request from angular
    Todo.create({
      done: false,
      text: req.body.text
    }, function(err, todo) {
      if (err)
        res.send(err);

      // get and return all the todos after you create another
      Todo.find(function(err, todos) {
        if (err)
          res.send(err);

        // send back all todos in JSON format
        res.json(todos);
      });
    });
  });

  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
      _id: req.params.todo_id
    }, function(err, todo) {
      if (err)
        res.send(err);

      Todo.find(function(err, todos) {
        if (err)
          return res.send(err);

        res.json(todos);
      });
    });
  });

  app.post('/api/login',
    passport.authenticate('login', {}),
    function (req, res) {
      console.log('API LOGIN: ' + req.body.id + req.body.username);
      res.json({ id: req.body.id, username: req.body.username})
    }
  );

  //app.post('/api/login', function (req, res) {
  //  //res.redirect(301, '/');
  //  console.log('API LOGIN: ' + req.body.id + req.body.name);
  //  res.send({
  //    id: 1,
  //    name: 'noob'
  //  })
  //});

  app.get('*', isLoggedIn, function(req, res) {
    res.sendFile('./public/index.html', { root: __dirname + '/..' });
  });

};
