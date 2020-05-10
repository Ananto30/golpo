const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    author: String,
    text: String,
    date: Date, //TODO: make it created_at
    updated_at: { type: Date, default: Date.now },
    comments: [
      {
        author: String,
        text: String,
        date: Date,
      },
    ],
  },
  { collection: "post" } // TODO: should be removed, need to fix mongo model
);

module.exports = {
  Post: mongoose.model("Post", postSchema),
};
