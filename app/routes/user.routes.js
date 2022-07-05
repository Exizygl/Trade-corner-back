const router = require("express").Router();
const UserService = require("../services/userService");
const successCbk = require("../misc/callbacks").successCbk;
const errorCbk = require("../misc/callbacks").errorCbk;
const userCtrl = require("../controllers/Auth/auth.controller");
const userController = require("../controllers/Auth/user.controller");
const { signUpErrors, signInErrors } = require("../utils/errors");
const { hasJWT } = require("../middlewares/jwt");
// Router POST

// router.post("/register", userCtrl.register);
// router.post("/activation", userCtrl.activateEmail);
// router.post("/login", authController.signIn);
// router.post("/register", authController.signUp);
// router.post("/login", authController.signIn);

router.post("/register", async (req, res) => {
  try {
    const user = await UserService.signUp(req.body);

    user.password = "***";
    return successCbk(res, 200, { user });
  } catch (error) {
    // const errors = signUpErrors(error)
    return res.status(400).send({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await UserService.signIn(
      req.body.email,
      req.body.password,
      res
    );
    user.user.password = "***";
    return successCbk(res, 200, { user });
  } catch (error) {
    const errors = signInErrors(error);
    return res.status(200).send({ errors });
  }
});


router.post("/update", hasJWT, async (req, res) => {
  try {
    
    
    const user = await UserService.userInfoUpdate(req.body, req.userId);
    return successCbk(res, 200, { user });
  } catch (error) {
    // const errors = signUpErrors(error)
    return res.status(400).send({ error });
  }
});

// Router GET

router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
// Router put




module.exports = router;
