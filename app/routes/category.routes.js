const router = require("express").Router();
const CategoryService = require("../services/categoryService");
const { hasJWT } = require("../middlewares/jwt");
const successCbk = require("../misc/callbacks").successCbk;
const errorCbk = require("../misc/callbacks").errorCbk;


router.get("/", async (req , res) => {
    try {
      const categoryList = await CategoryService.getAllCategory();
      return successCbk(res, 200, { categoryList });
    } catch (error) {
  
       return res.status(201).send({error });
      
    }
  });

  module.exports = router;