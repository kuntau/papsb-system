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
  passport.use('login', new LocalStrategy({
      usernameField     : 'username',
      passwordField     : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function (req, username, password, done) {

      var user = {
        id      : 7,
        username: 'kuntau',
        email   : 'kuntau17@gmail.com'
      };

      console.log('passport.auth: ' + username);
      if (username === 'noob')
        return done('error noob la');

      return done(null, user);
    }));

  // local signup
  // ===========
  passport.use('signup', new LocalStrategy({
    usernameField     : 'username',
    passwordField     : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function (req, username, password, done) {
    return done('error signup')
  }));
};
