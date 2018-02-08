'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING(15),
    email: DataTypes.STRING(100),
    password: DataTypes.STRING.BINARY
  });

  User.associate = function(models) {
    models.User.hasMany(models.Task);
  };

  return User;
};
