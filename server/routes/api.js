const express = require('express');
const router = new express.Router();
const Settlement = require('../models/Settlement')

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message."
  });
});

function asyncWrap(fn) {
  return function (req, res, next) {
    fn(req, res).catch(next);
  }
}

router.get('/settlements', asyncWrap(async (req, res) => {
  console.log('req: %j', req.user);
  const userId = req.user.id;
  const settlementList = await Settlement.findByUserId(userId);
  res.send(settlementList);
  console.log(req.user);
  return req.user.email
}));

module.exports = router;
