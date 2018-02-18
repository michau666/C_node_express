const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.authSchema), passport.authenticate('local', { session: false }), UsersController.signIn);

router.route('/secret')
  .get(passport.authenticate('jwt', { session: false }), UsersController.secret);

/* Create new user */
// router.post('/create', (req, res) => {
//   let body = _.pick(req.body, ['username', 'email', 'password']);
//   models.User.create(body)
//     .then((user) => {
//       res.header('x-auth', user.token).render('reports', {
//         title: 'You are logged in!',
//       });
//       // let safeUser = _.pick(user, ['username', 'email']);
//       // res.header('x-auth', user.token).send(safeUser);
//     }).catch((e) => {
//       console.log(JSON.stringify(e));
//       res.render('home', {
//         title: 'Registration error',
//         errors: e.errors
//       });
//     });
// });

module.exports = router;