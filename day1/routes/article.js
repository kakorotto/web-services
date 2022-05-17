const router = require("express").Router();
const Article = require("../models/Article");
const articleController = require("../controllers/article");

//create
router.post("/",articleController.createArticle);
//delete
router.delete("/:id", articleController.deleteArticle);

//Get
router.get("/",articleController.getAllArticle );

router.get("/:id", articleController.getAllArticleById );

router.put("/:id", articleController.UpdatedArticle);

//article's comments
router.get("/comments/:id",articleController.getArticleComments );

module.exports = router;
