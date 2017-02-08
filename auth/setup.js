var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.use('local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, findAndComparePassword));

// user -> userID
passport.serializeUser(function(user, done){
  console.log('Serializing User');
  done(null, user.id);
});

// userID -> user
passport.deserializeUser(function(id, done){
  console.log('Deserializing User');
  User.findById(id, function(err, user){
    if (err) {
      console.log('Error deserializing User', err);
      return done(err);
    }

    done(null, user);
  })
});

function findAndComparePassword(username, password, done) {
  console.log('Finding and comparing passwords');
  User.findOne({username: username}, function(err, user){
    if (err) {
      console.log('Error finding user by username', err);
      return done(err);
    }

    if (user) {
      console.log('found a user with username', username);
      if (user.password === password) {
        console.log('Passwords matched');

        // passing the user object here indicates to passport
        // that the user passed our validation and should
        // be logged in
        return done(null, user);
      }
    }

    // false here means the user did not pass validation
    // and should not be logged in
    console.log('Passwords did not match, or user was not found');
    return done(null, false);
  });
}
