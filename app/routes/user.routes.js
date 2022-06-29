const router = require("express").Router();
const UserService = require('../services/userService');
const successCbk = require('../misc/callbacks').successCbk;
const errorCbk = require('../misc/callbacks').errorCbk;
const authController = require("../controllers/Auth/auth.controller");
const userController = require("../controllers/Auth/user.controller");
const { signUpErrors, signInErrors } = require('../utils/errors');

// Router POST

// router.post("/register", authController.signUp);
// router.post("/login", authController.signIn);

router.post('/register', async (req, res) => {
    try {

        const user = await UserService.signUp(req.body);

        user.password = "***";
        return successCbk(res, 200, { user });
    } catch (error) {
        // const errors = signUpErrors(error)
        return res.status(400).send({ error });
    }

});

router.post('/login', async (req, res) => {
 
    try {

        const user = await UserService.signIn(req.body.email, req.body.password, res);
        user.user.password = "***";
        return successCbk(res, 200, { user });
    } catch (error) {
        const errors = signInErrors(error)
        return res.status(200).send({ errors });
    }
});

// Router GET

router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
// Router put

module.exports = router;
