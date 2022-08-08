const router = require("express").Router();
const ProductService = require("../services/productService");
const { hasJWT } = require("../middlewares/jwt");

const successCbk = require("../misc/callbacks").successCbk;
const errorCbk = require("../misc/callbacks").errorCbk;





router.post("/add", hasJWT, async (req, res) => {
  console.log("ça rentre dans la route : " );
  console.log("req.body : " + JSON.stringify(req.body));
  console.log ("req.userId : " + req.userId);
  try {
      
      const product = await ProductService.addProduct(req.body, req.userId);// add product to schema
      return successCbk(res, 200, { product });

    } catch (error) {
  
      //const errors = productAddErrors(error)
  
      return res.status(201).send( {error});
    }
  });

  module.exports = router;