// routes.js

var Todo = require('./models/todo');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('routes.js --> user is authenticated');
    return next();
  }

  console.log('routes.js --> user not logged in');
  //res.sendFile('./public/index.html', { root: __dirname + '/..' });
  res.status(400).json({ error: 'User is not authenticated '})
}

module.exports = function(app, passport) {

  // api -------------

  app.get('/api/auth', isLoggedIn, function (req, res) {
      res.send('authenticated');
      //if (req.user) {
      //  res.json(user)
      //} else {
      //  res.status(401).send({ error: 'User is not authenticated' })
      //}
    }
  );

  app.post('/api/auth', passport.authenticate('login'), function (req, res) {
      if (req.user) {
        res.json(req.user)
      } else res.status(403).send({ error: 'Login error'})
    }
  );

  app.delete('/api/auth', function (req, res) {
    if (req.user) {
      req.logOut();
      res.send('Logged out')
    } else res.status(400).json({ error: 'You\'re not logged in' })
  });

  app.get('*', isLoggedIn, function(req, res) {
    res.sendFile('./public/index.html', { root: __dirname + '/..' });
  });

};
