const models  = require('../models');
const _ = require('lodash');
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
      title: 'home page',
  });
});


// router.get('/', (req, res) => {
//   models.User.findAll({
//     include: [ models.Task ]
//   }).then(function(users) {
//     res.render('index', {
//       title: 'Home page',
//       users: users,
//     });
//   });
// });

module.exports = router;
