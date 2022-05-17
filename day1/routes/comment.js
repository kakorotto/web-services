const router = require("express").Router();
const commentController = require("../controllers/comment")

router.delete("/:id", commentController.deleteComment);

router.post("/",commentController.createComment );

router.put("/:id",commentController.updateCommnet );


module.exports = router;