// routes.js

var Todo = require('./models/todo');

module.exports = function(app) {
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

  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });

};
