const models  = require('../models');
const _ = require('lodash');
const express = require('express');
const router  = express.Router();
const {authenticate} = require('../controllers/middleware/authenticate');

// router.get('/report', authenticate, (req, res) => {
//   res.send('Report is temporarily unavailable, but you have access to it :)');
// });



/*
router.post('/login', (req, res) => {
  let body = _.pick(req.body, ['username', 'email', 'password']);
  models.User.create(body)
    .then((user) => {
      let safeUser = _.pick(user, ['username', 'email']);
      res.header('x-auth', user.token).render('me', {
        title: 'You are logged in!',
      });
      // res.header('x-auth', user.token).send(safeUser);
    }).catch((e) => {
      console.log(JSON.stringify(e));
      res.render('home', {
        title: 'Registration error',
        errors: e.errors
      });
    });
});
  
  
*/
module.exports = router;
