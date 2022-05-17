const Article = require("../models/Article");

const createArticle = async (req, res) => {
  const newArticle = new Article(req.body);

  try {
    const savenArticle = await newArticle.save();
    res.status(200).json(savenArticle);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json("Article deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllArticle = async (req, res) => {
  try {
    const articles = await Article.find().sort({ _id: -1 }).limit(5);

    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json(err);
  }
};


const getAllArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json(err);
  }
};

const UpdatedArticle   = async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedArticle);
  } catch (err) {
    res.status(500).json(err);
  }
}

const getArticleComments = async (req, res) => {
  try {
    const comments = await Article.findById(req.params.id).select({
      comment: 1,
      _id: 0,
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  createArticle,
  deleteArticle,
  getAllArticle,
  getAllArticleById,
  UpdatedArticle,
  getArticleComments,
};
