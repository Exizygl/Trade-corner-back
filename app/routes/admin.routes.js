const router = require("express").Router();
const adminService = require("../services/adminService");

const successCbk = require("../misc/callbacks").successCbk;
const { hasJWT } = require("../middlewares/jwt");


// Router PUT


router.put("/delete", async (req,res)=>{
  try {
    const userToDelete = await adminService.deleteUser(req.body, req.userToDeleteId);
    return successCbk(res, 200, {userToDelete });
  } catch (error) {
    return res.status(201).send({error});
  }   
});


module.exports = router;