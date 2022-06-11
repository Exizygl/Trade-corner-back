const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

// Router POST

router.post("/register", userController.signUp);
router.post("/login", userController.signIn);

// Router GET

router.get("/", userController.getAllUsers);
// Router put
