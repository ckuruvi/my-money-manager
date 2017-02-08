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
      user.comparePassword(password, function(err, match){
        if (err) {
          console.log('Error comparing password');
          done(err);
        } else {
          if (match) {
            console.log('Passwords matched');
            done(null, user);
          } else {
            console.log('Passwords did not match');
            done(null, false);
          }
        }
      });
    } else {
      // false here means the user did not pass validation
      // and should not be logged in
      console.log('User was not found');
      return done(null, false);
    }
  });
}
