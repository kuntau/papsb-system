// config passport.js

// load local strategy
var LocalStrategy    = require('passport-local').Strategy;

// load user model
var User             = require('../app/models/user.js');

// expose this function to our app using module.exports
module.exports = function (passport) {

  // passport session setup
  // ======================
  // serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // local login
  // ===========
  passport.use('local', new LocalStrategy({
    usernameField     : 'username',
    passwordField     : 'password',
    passReqToCallback : true
  },
  function (req, username, password, done) {
    // body...
  }
  ))

}
