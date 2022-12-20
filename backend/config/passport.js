const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User')


//https://www.faqcode4u.com/faq/61648/display-passport-js-authentication-error-message-in-view

module.exports = function(passport) {

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ));



passport.serializeUser(function(user, done){
    console.log(user.id)
    done(null, user.id)
})
passport.deserializeUser(function(id, done){
   User.findById(id, function(err, user) {
    done(err, user)
   })
})
}