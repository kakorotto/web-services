const router = require("express").Router();
const userController = require("../controllers/user")


router.post("/", userController.createUser);
//update
router.put("/:id",userController.updateUser);

//delete
router.delete("/:id", userController.deleteUser);

//get user
router.get("/:id",userController.getUser);

//all users
router.get("/",userController.getAllUsers);



router.post("suspended/:id",userController.suspended);

router.post("unSuspended/:id",userController.unSuspended);



module.exports = router;
