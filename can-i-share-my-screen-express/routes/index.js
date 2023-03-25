const express = require('express');
const router = express.Router();

const passport = require('passport');

// add this function for any routes where
// we want to make sure a user is logged in
const ensureLoggedIn = require('../config/ensureLoggedIn');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Google OAuth login
router.get('/auth/google', passport.authenticate(
  'google',
  {
    // requesting user profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    // *** we could potentially name the main post page 'all'
    successRedirect: '/all',
    failureRedirect: '/all'
  }
));

router.get('/logout', function(req, res) {
  // logs the user out of the current oauth & provides
  // a callback function for what to do after logging out
  req.logout(function() {
    res.redirect('/all');
  })
});

module.exports = router;
