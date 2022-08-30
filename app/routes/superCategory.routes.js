const router = require("express").Router();
const SuperCategoryService = require("../services/superCategoryService");

const successCbk = require("../misc/callbacks").successCbk;
const errorCbk = require("../misc/callbacks").errorCbk;


router.get("/", async (req , res) => {
    try {
        
      const superCategoryList = await SuperCategoryService.getAllSuperCategory();
      
      return successCbk(res, 200, { superCategoryList });
    } catch (error) {
  
       return res.status(201).send({   error });
      
    }
  });

  router.get("/:superCategory", async (req , res) => {
    try {
      const superCategoryList = await SuperCategoryService.getBySuperCategory(req.params.superCategory);
      console.log(superCategoryList)
      return successCbk(res, 200, { superCategoryList });
    } catch (error) {
  
       return res.status(201).send({    error });
      
    }
  });

  module.exports = router;