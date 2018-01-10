const jwt = require('jsonwebtoken');
const User = require('../models/User')
const Config = require('../../config/index');

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {  
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];
  
  // decode the token using a secret key-phrase
  return jwt.verify(token, Config.JWT_SECRET, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
      return res.status(401).end();
    }

    const userId = decoded.sub;

    User.findOneById(userId)
      .then(function (user) {
        if (!user) {
          return res.status(401).end();
        }
        req.user = user;
        return next();
      })
      .catch(next);
  });
};
