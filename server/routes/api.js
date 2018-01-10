const express = require('express');
const router = new express.Router();
const Project = require('../models/Project')

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

router.get('/projects', asyncWrap(async (req, res) => {
  console.log('req: %j', req.user);
  const userId = req.user.id;
  const projectList = await Project.findByUserId(userId);
  res.send(projectList);
}));

module.exports = router;
