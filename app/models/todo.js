// app/models/todo.js

var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
  done: Boolean,
  text: String
});
