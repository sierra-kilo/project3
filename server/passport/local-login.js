const jwt = require('jsonwebtoken');
const User = require('../models/User')
const PassportLocalStrategy = require('passport-local').Strategy;
const Config = require('../../config/index');


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
    password: password.trim()
  };

  // find a user by email address
  User.findOneByEmail(userData.email)
    .then(async function (user) {
      if (!user) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';
        done(error);
        return
      }
      const same = await user.comparePassword(userData.password);
      if (!same) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';
        done(error);
        return
      }

      const payload = {
        sub: user.id
      };

      // create a token string
      const token = jwt.sign(payload, Config.JWT_SECRET);
      const data = {
        name: user.name
      };

      done(null, token, data);
      return
    })
    .catch(done);
});
