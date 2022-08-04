const router = require("express").Router();
const UserService = require("../services/userService");

const successCbk = require("../misc/callbacks").successCbk;
const errorCbk = require("../misc/callbacks").errorCbk;
const userCtrl = require("../controllers/Auth/auth.controller");
const userController = require("../controllers/Auth/user.controller");
const {
  signUpErrors,
  signInErrors,
  updateErrors,
  userSoftDeleteErrors,
  ForgottenPasswordErrors,
  passwordChangeErrors,
} = require("../utils/errors");
const { hasJWT } = require("../middlewares/jwt");
const upload = require("../middlewares/upload");

// Router POST

router.post("/register", async (req, res) => {
  try {
    const user = await UserService.signUp(req.body);
    user.password = "***";
    return successCbk(res, 200, { user });
  } catch (err) {
    const errors = signUpErrors(err);
    return res.status(400).send({ errors });
  }
});

router.put("/confirm", async (req, res) => {
  const { emailCrypt } = req.body;

  try {
    const user = await UserService.confirmRegistration(emailCrypt);
    user.password = "***";

    return successCbk(res, 200, user);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Confirmation non autorisé",
    });
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
    const errors = updateErrors(error);

    return res.status(200).send({ errors });
  }
});

router.post("/upload-image", hasJWT, upload, async (req, res) => {
  try {
    const user = await UserService.uploadImageUser(
      req.file ? req.file.filename : "",
      req.userId
    );
    user.password = "***";

    return successCbk(res, 200, { user });
  } catch (error) {
    return errorCbk(res, 405, error);
  }
});

router.post("/delete", hasJWT, async (req, res) => {
  try {
    const user = await UserService.userSoftDelete(req.body, req.userId);
    return successCbk(res, 200, { user });
  } catch (error) {
    const errors = userSoftDeleteErrors(error);
    return res.status(200).send({ errors });
  }
});

router.post("/forgotten-password", async (req, res) => {
  try {
    const user = await UserService.userForgottenPassword(req.body);
    return successCbk(res, 200, { user });
  } catch (error) {
    const errors = ForgottenPasswordErrors(error);
    return res.status(200).send({ errors });
  }
});

router.post("/password-change", async (req, res) => {
  try {
    const user = await UserService.userPasswordChange(req.body);
    return successCbk(res, 200, { user });
  } catch (error) {
    const errors = passwordChangeErrors(error);
    return res.status(200).send({ errors });
  }
});

// Router PUT

router.put("/confirm", async (req, res) => {
  const { emailCrypt } = req.body;

  try {
    const user = await UserService.confirmRegistration(emailCrypt);
    user.password = "***";

    return successCbk(res, 200, user);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Confirmation non autorisé",
    });
  }
});

// Router GET

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
    return res.json({ msg: "Logged out" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);

module.exports = router;
