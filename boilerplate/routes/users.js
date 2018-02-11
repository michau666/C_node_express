const models  = require('../models');
const _ = require('lodash');
const express = require('express');
const router  = express.Router();
const {authenticate} = require('../controllers/middleware/authenticate');

/* Registration form */
router.get('/create', (req, res) => {
  res.render('login', {
    title: 'Registration'
  });
});

/* Create new user */
router.post('/create', (req, res) => {
  let body = _.pick(req.body, ['username', 'email', 'password']);
  models.User.create(body)
    .then((user) => {
      res.header('x-auth', user.token).render('reports', {
        title: 'You are logged in!',
      });
      // let safeUser = _.pick(user, ['username', 'email']);
      // res.header('x-auth', user.token).send(safeUser);
    }).catch((e) => {
      console.log(JSON.stringify(e));
      res.render('home', {
        title: 'Registration error',
        errors: e.errors
      });
    });
});

module.exports = router;
