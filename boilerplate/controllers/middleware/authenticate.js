const models  = require('./../../models');

let authenticate = (req, res, next) => {
  let receivedToken = req.header('x-auth');

  models.User.findByToken(receivedToken)
    .then((user) => {
      if (!user) {
        return Promise.reject();
      }
      req.user = user;
      req.receivedToken = receivedToken;
      next();
    }).catch((e) => {
      // res.status(401).send();
      res.redirect('/');
    });
};

module.exports = {authenticate};