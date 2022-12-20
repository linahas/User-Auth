const router =require("express").Router();
const{ signupUser } =require("../Controller/user.controller")

const userController = require("../Controller/user.controller")
// router.get("/", userController.getAllUsers);
// router.post("/new", userController.createUser);
// router.put("/edit/:userId", userController.editUser);
// // router.get("/show/:userId", userController.showUser);
// router.delete("/delete/:userId", userController.deleteUser);

//Authentication
//login route
router.post('/login', userController.loginUser)

// signup route
router.post('/signup', signupUser)

module.exports = router;