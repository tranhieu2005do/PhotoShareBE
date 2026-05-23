const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: String,
  date_time: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const PhotoSchema = new mongoose.Schema({
  file_name: String,
  date_time: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [CommentSchema],
});

module.exports = mongoose.model("Photo", PhotoSchema);
