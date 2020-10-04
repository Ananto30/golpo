const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const chatRouter = require("./routes/chat");
const userRouter = require("./routes/user");
const activityRouter = require("./routes/activity");

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

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

module.exports = app;
