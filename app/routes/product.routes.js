const router = require("express").Router();
const ProductService = require("../services/productService");
const { hasJWT } = require("../middlewares/jwt");

const successCbk = require("../misc/callbacks").successCbk;
const errorCbk = require("../misc/callbacks").errorCbk;



router.post("/add", hasJWT, async (req, res) => {
    try {
      console.log("toto");
      const user = await ProductService.addProduct(req.body, req.userId);
      return successCbk(res, 200, { user });
    } catch (error) {
  
      //const errors = productAddErrors(error)
  
      // return res.status(200).send({ errors });
    }
  });

  module.exports = router;