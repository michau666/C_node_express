const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('./models').User;

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('auth'),
    secretOrKey: process.env.TOKEN_SECRET
}, async (payLoad, done) => {
    try {
        // Find the user specified in token
        const user = await User.findById(payLoad.sub);

        // If user does not exist, handle it
        if (!user) {
            return done(null, false);
        }

        // Otherwise, return the user
        done(null, user); 

    } catch (error) {
        done(error, false);
    }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {

    // Find the user given the email
    const user = User.findOne({ where: {email}})
        .then((user) => {
            if (!user) {
                return done (null, false)
            }
                
            // Check if the password is correct
            const isMatch = user.isValidPassword(password);

            isMatch.then((res) => {
                if (!res) {
                    return done(null, false);
                } else {
                    // Otherwise, return the user
                    done(null, user);
                }
            });
        })
        .catch((e) => {
            done (error, false);
        })
}));