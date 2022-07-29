const router = require("express").Router();
const ProductService = require("../services/productService");
const { hasJWT } = require("../middlewares/jwt");

const successCbk = require("../misc/callbacks").successCbk;
const errorCbk = require("../misc/callbacks").errorCbk;
const upload = require("../middlewares/upload");


router.post("/add", hasJWT, upload, async (req, res) => {
    try {
      
      const user = await ProductService.addProduct(req.body, req.userId);// add product to schema
      return successCbk(res, 200, { user });
    } catch (error) {
  
      //const errors = productAddErrors(error)
  
      // return res.status(200).send({ errors });
    }
  });

  module.exports = router;