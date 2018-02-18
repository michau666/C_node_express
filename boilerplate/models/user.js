const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();

let user = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Something is wrong with your email, try typing it again'
        },
      }
    },
    password: { 
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: {
          args: [5, 30],
          msg: 'Come up with password longer than 5 characters but shorter than 30, come on! :)'
        },
      }
    },
    token: {
      type: DataTypes.TEXT,
    }
  });
    
  hashPassword = (password) => {
    return new Promise ((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return reject(err);
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) return reject(err);
          return resolve(hash);
        });
      });
    });
  };

  generateAuthToken = (user) => {
    return new Promise ((resolve, reject) => {
      let token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET);
      if (!token) return reject();
      return resolve(token);
    });
  };

  User.beforeCreate((user, options) => {
    return hashPassword(user.password)
      .then(hash => {user.password = hash;})
      .catch(err => {
      if (err) console.log(err);
    });
  });

  User.beforeCreate((user, options) => {
    return generateAuthToken(user)
      .then(token => {user.token = token;})
      .catch(err => {
      if (err) console.log(err);
    });
  });

  User.Instance.prototype.isValidPassword = async function(newPassword) {
    try {
      return await bcrypt.compare(newPassword, this.password);
    } catch(error) {
      throw new Error(error);
    }
  }

  User.findByToken = function (receivedToken) {
    let User = this;
    let decoded;

    try {
      decoded = jwt.verify(receivedToken, process.env.TOKEN_SECRET);
    } catch (e) {
      return Promise.reject();
    }
    
    return User.findOne({ where: {token: receivedToken}});
  };

  User.associate = function(models) {
    models.User.hasMany(models.Task);
  };

  return User;
};

module.exports = (user);