const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
        username: String,
        content: String,
        date: { type: Date, default: Date.now },
  });

module.exports = mongoose.model("Comment", commentSchema);
