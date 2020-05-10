const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");
const passport = require("passport");

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const chatRouter = require("./routes/chat");
const userRouter = require("./routes/user");
const activityRouter = require("./routes/activity");

const passportSetup = require("./config/passport-setup");

const config = require("./config");

const app = express();

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (
    !req.secure &&
    req.get("x-forwarded-proto") !== "https" &&
    process.env.NODE_ENV !== "development"
  ) {
    return res.redirect("https://" + req.get("host") + req.url);
  }
  next();
}

// localhost doesn't need this, TODO: need to start server with env type
// app.use(requireHTTPS);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

app.use(passport.initialize());

const mongooseConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(config.mongoUrl, mongooseConnectOptions);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/../client/build")));

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/chat", chatRouter);
app.use("/api/user", userRouter);
app.use("/api/activity", activityRouter);


// TODO: this should be moved to some router?
app.get(
  "/auth/social/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

app.get(
  "/auth/social/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    let user = req.session.passport.user._json;
    res.redirect("/google/auth/" + user.email);
  }
);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

module.exports = app;
