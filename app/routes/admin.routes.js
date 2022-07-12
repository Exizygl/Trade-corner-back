const router = require("express").Router();
const adminService = require("../services/adminService");


const successCbk = require("../misc/callbacks").successCbk;
const errorCbk = require("../misc/callbacks").errorCbk;
const { hasJWT } = require("../middlewares/jwt");


// Router PUT

// router.put("/delete/:id",userController.deleteUserById);

router.put("/delete", async (req,res)=>{
    try {
        const userToDelete = await adminService.deleteUser(req.body, req.userId);
        return successCbk(res, 200, { userToDelete });
         } catch (error) {
           return res.status(400).send({ error });
        }    }
);




// router.post("/update", hasJWT, async (req, res) => {
//     try {
//       const user = await UserService.userInfoUpdate(req.body, req.userId);
//       return successCbk(res, 200, { user });
//     } catch (error) {
//       // const errors = signUpErrors(error)
//       return res.status(400).send({ error });
//     }
//   });

module.exports = router;