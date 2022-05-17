const Comment = require("../models/Comment");

const deleteComment =   async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("Comment deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

const createComment = async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const saveComment = await newComment.save();
    res.status(200).json(saveComment);
  } catch (err) {
    res.status(500).json(err);
  }
};


const updateCommnet = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
};




module.exports = { deleteComment, createComment, updateCommnet };
