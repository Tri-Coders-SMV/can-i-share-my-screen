const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy(
    // Configuration object to specify the details of the google oauth
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    // upon authenticating, calls this callback function
    async function(accessToken, refreshToken, profile, cb) {
        // profile contains "id", "displayName", "emails", and "photos"
        try {
            // checks to see if a user exists with a promise
            let user = await User.findOne({ googleId: profile.id });
            
            // if the user has already logged in & there is a corresponding
            // user document, continue & provide the user document to passport
            if (user) return cb(null, user);

            // else if this is a new user
            user = await User.create({ // creates a new user document
                // *** maybe find a way to redirect this to a page where
                // a user can pick their own user/display name?
                name: profile.displayName,
                googleId: profile.id,
                email:profile.emails[0].value,
                avatar: profile.photos[0].value
            });
            // returns the newly added user document
            return cb(null, user);
        } catch (err) {
            return cb(err);
        }
    }
));

        // I'm not 100% sure what these are doing, let's talk it out!

passport.serializeUser(function(user, cb) {
    cb(null, user._id);
});

passport.deserializeUser(async function(userId, cb) {
    cb(null, await User.findById(userId));
})
    
