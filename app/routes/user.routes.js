const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

// Router POST

router.post("/register", authController.signUp);
router.post("/login", authController.signIn);

// Router GET

router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
// Router put

module.exports = router;
