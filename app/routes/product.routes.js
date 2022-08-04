const router = require("express").Router();
const ProductService = require("../services/productService");
const { hasJWT } = require("../middlewares/jwt");

const successCbk = require("../misc/callbacks").successCbk;
const errorCbk = require("../misc/callbacks").errorCbk;
const upload = require("../middlewares/upload");


router.post("/add", hasJWT, upload, async (req, res) => {
    try {
      
      const product = await ProductService.addProduct(req.body, req.userId);// add product to schema
      
      // const image = await ProductService.uploadImageUser(
      //   req.file ? req.file.filename : "",
      //   product._id
      // );
      
      return successCbk(res, 200, { product });
    } catch (error) {
  
      //const errors = productAddErrors(error)
  
      // return res.status(200).send({ errors });
    }
  });
// Router GET

router.get("/", async (res) => {
  try {
   
    const productList = await ProductService.getAllProducts();
    console.log(productList)
    return res.status(200).send(productList);
  } catch (error) {
    
  }
});


module.exports = router;