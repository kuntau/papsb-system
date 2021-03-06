// routes.js
'use strict';

var faker = require('faker');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('routes.js --> user is authenticated');
    return next();
  }

  console.log('routes.js --> user not logged in');
  res.status(400).json({ error: 'User is not authenticated '})
}

module.exports = function(app, passport) {

  // api -------------

  app.get('/api/auth', isLoggedIn, function(req, res) {
    res.send('authenticated');
  });

  app.post('/api/auth', passport.authenticate('login'), function(req, res) {
    if (req.user) {
      res.json(req.user)
    } else res.status(403).send({ error: 'Login error'})
  });

  app.delete('/api/auth', function(req, res) {
    if (req.user) {
      req.logOut();
      res.send('Logged out')
    } else res.status(400).json({ error: 'You\'re not logged in' })
  });

  // faker
  app.get('/api/user', function (req, res) {
    res.json( faker.helpers.userCard() )
  });
  app.get('/api/users', function (req, res) {
    var users = [],
        limit = 20;
    for (var i = 0; i < limit; i++) {
      users.push(faker.helpers.userCard());
    }
    res.json(users)
  });

  // sessions --
  app.get('/login', function(req, res) {
    res.sendFile('./public/index.html', { root: __dirname + '/..' });
  });

  // catch all --
  app.get('*', isLoggedIn, function(req, res) {
    res.sendFile('./public/index.html', { root: __dirname + '/..' });
  });

};
