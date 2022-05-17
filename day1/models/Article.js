var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ArticleSchema = Schema(
  {
    title: { type: String, required: true, unique: true },
    body: { type: String },
    comments: [
      {
        comment: {
          type: mongoose.Types.ObjectId,
          required: [true, "comment required"],
          ref: "Comment",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", ArticleSchema);
