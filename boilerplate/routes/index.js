var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.User.findAll({
    include: [ models.Task ]
  }).then(function(users) {
    res.render('index', {
      title: 'Sequelize: Express Example',
      users: users,
      conditon: true
    });
  });
});

router.post('/register', (req, res) => {

  passwordRepeated = req.body.passwordRepeated;
  
  models.User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }).then(() => {
    res.render('index', {
      title: 'Registration complete'
    });
  });
});

module.exports = router;
