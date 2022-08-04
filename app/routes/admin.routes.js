const router = require("express").Router();
const adminService = require("../services/adminService");
const roleUserService = require("../services/roleUserService");

const successCbk = require("../misc/callbacks").successCbk;
const errorCbk = require("../misc/callbacks").errorCbk;
const { hasJWT } = require("../middlewares/jwt");
const upload = require('../middlewares/upload');


// Router PUT


router.put("/delete", async (req,res)=>{
  try {
    const userToDelete = await adminService.deleteUser(req.body, req.userToDeleteId);
    return successCbk(res, 200, {userToDelete });
  } catch (error) {
    return res.status(201).send({error});
  }   
});

router.put("/update", hasJWT, async (req, res) => {

  if (req.body.valueName === "role")
  {
    try {
      const userUpdated = await roleUserService.updateUserRole(req.body);
      return successCbk(res, 200, { userUpdated });
    }
    catch (error) {
      return res.status(201).send({ error });
    }
  }

  try {
    const userUpdated = await adminService.updateUser(req.body);
    return successCbk(res, 200, { userUpdated });
  } catch (error) {
    return res.status(201).send({ error });
  }
});

//Route POST

router.post('/upload-image', hasJWT, upload, async (req, res) => {
  try {
    const userUpdated = await adminService.uploadImageUser(req.file ? req.file.filename : "" , req.userId, req.body.userToUpdate);
          userUpdated.password = "***";
      return successCbk(res, 200, { userUpdated });
  } catch (error) {
      return errorCbk(res, 405, error);
  }
});


module.exports = router;