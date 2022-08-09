const router = require("express").Router();
const roleUserService = require("../services/roleUserService");

const successCbk = require("../misc/callbacks").successCbk;
const errorCbk = require("../misc/callbacks").errorCbk;
const { hasJWT } = require("../middlewares/jwt");
const upload = require('../middlewares/upload');


// Router GET


router.get('/', hasJWT, async (req, res) => {
  try {
    const roles = await roleUserService.getAllRoles();
    return successCbk(res, 200, { roles });
  }
  catch (error) {
    return errorCbk(res, 405, error);
  }
});


module.exports = router;