var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const jwt = require("jsonwebtoken");
const config = require("../config");

const userService = require("../service/user.service");

passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientID,
      clientSecret: config.googleClientSecret,
      callbackURL: config.googleCallbackUrl,
    },
    async function (accessToken, refreshToken, profile, done) {
      const profileData = profile._json;
      let user = await userService.getUserByGoogleMail(profileData.email);
      if (!user) {
        data = {
          username: profileData.email.split("@")[0],
          google_id: profileData.sub,
          google_email: profileData.email,
          google_name: profileData.name,
          google_picture: profileData.picture,
        };
        user = await userService.createUser(data);
        await userService.createUserMeta({ username: user.username });
      }

      // a hack to send short token for making proper login request
      let token = jwt.sign({ username: user.username }, config.jwtSecret, {
        expiresIn: "10s",
      });
      userService.updateUser(user.username, { google_token: token });

      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
