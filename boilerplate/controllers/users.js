const jwt = require('jsonwebtoken');
const localstorage = require('node-localstorage');
const http = require('http');
if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
}
const User  = require('../models').User;

signToken = user => {
  return jwt.sign({
    iss: 'Hermes',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, process.env.TOKEN_SECRET);
}

module.exports = {
  signUp: async (req, res, next) => {
    
    // console.log('UsersController.signUp() called!');
    const { username, email, password } = req.value.body;
    
    // Check if there is a user with the same email
    return User.findOne({ where: { email }})
      .then((user) => {
        if (user) {
          // User with this email exists, can add another one.
          return res.status(403).json({ error: `User with email: ${email} already exists` });
        } else {
        
          // Create a new user
        const newUser = User.build({ username, email, password })
        return newUser.save()
          .then((user) => {
            // Generate the token
            const token = signToken(user); 
              
            // Respond with token
            res.status(200).json({ token });

          })
        }
      })
      .catch((e) => {
        res.status(400).json({ message: "Ups, something went wrong, try again."});
      })
  },

  signIn: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);

    // Set a token in localStorage
    // localStorage.setItem('auth', token);
    
    res.status(200).json({ token });  
    console.log('Login successful!');
  },

  secret: async (req, res, next) => {
    // let auth = localStorage.getItem('auth');
    // req.header('auth', auth);

    console.log('UsersController.secret() called!');
    res.status(200).json({ access: 'granted', token: auth})
  }
}