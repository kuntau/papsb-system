// routes.js

var Todo = require('./models/todo');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('routes.js --> user is authenticated');
    return next();
  }

  console.log('routes.js --> user not logged in');
  res.sendFile('./public/index.html', { root: __dirname + '/..' });
}

module.exports = function(app, passport) {

  // api -------------

  app.get('/api/auth', isLoggedIn, function (req, res) {
      if (req.user) {
        res.json(user)
      } else res.json({ error: 'User is not authenticated' })
    }
  );

  app.post('/api/auth',
    passport.authenticate('login', {}),
    function (req, res) {
      res.json(req.user)
    }
  );

  app.delete('/api/auth', function (req, res) {
    if (req.user) {
      res.send(req.user.username + ', logged out')
      req.logout();
    } else res.json({ error: 'You\'re not logged in' })
  });

  app.get('*', isLoggedIn, function(req, res) {
    res.sendFile('./public/index.html', { root: __dirname + '/..' });
  });

};
