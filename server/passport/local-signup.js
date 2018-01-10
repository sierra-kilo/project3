const User = require('../models/User');
const PassportLocalStrategy = require('passport-local').Strategy;


/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    name: req.body.name.trim()
  };

  User.save({
    name: req.body.name.trim(),
    email: email.trim(),
    password: password.trim(),
  })
    .then(function (userId) {
      done(null);
    })
    .catch(done);
});
