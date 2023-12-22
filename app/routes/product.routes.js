const router = require('express').Router();
const ProductService = require('../services/productService');
const { hasJWT } = require('../middlewares/jwt');
const TransporteurService = require('../services/transporteurService')
const successCbk = require("../misc/callbacks").successCbk;
const errorCbk = require("../misc/callbacks").errorCbk;
const uploadProductPhotos = require("../middlewares/uploadProductPhotos");
const upload = require("../middlewares/upload");
const { successCbkProduct } = require("../misc/callbacks");

router.post('/add', hasJWT, uploadProductPhotos, async (req, res) => {
  console.log('ça rentre dans la route : ');

  try {
      const product = await ProductService.addProduct(req.files, req.body, req.userId);// add product to schema
      
      //  const image = await ProductService.uploadImageUser(
      //   req.file ? req.file.filename : "",
      //   product._id
      // );
      
      return successCbk(res, 200, { product });
    } catch (error) {
  
      return res.status(201).send(error);
    }
  });

router.put("/modify", hasJWT, uploadProductPhotos, async (req, res) => {
    console.log("ça rentre dans la route modify" );     
    try {
      console.log(req.body)
        const product = await ProductService.modifyProduct(req.files, req.body, req.userId);
        return successCbk(res, 200, { product });
      } catch (error) {
    
        return res.status(201).send(error);
      }
    });  

router.put("/delete", hasJWT, uploadProductPhotos, async (req, res) => {
    console.log("ça rentre dans la route delete" );     
    try {
      console.log(req.body.productId)
        const product = await ProductService.deleteProduct(req.body.productId);
        return successCbk(res, 200, { product });
      } catch (error) {
    
        return res.status(201).send(error);
      }
    });  

// Router GET

router.get('/', async (req, res) => {
  try {
    const productList = await ProductService.getAllProducts();
    return successCbk(res, 200, { productList });
  } catch (error) {
    return res.status(201).send({ error });
  }
});
router.get('/new', async (req, res) => {
  try {
  
    const productList = await ProductService.getNewProducts();
    console.log(productList)
    return successCbk(res, 200, { productList });
  } catch (error) {
    return res.status(201).send({ error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await ProductService.getById(req.params.id);

    return successCbk(res, 200, { product });
  } catch (error) {
    return res.status(201).send({ error });
  }
});

router.get("/search/:search/:page/:superCategory/:category/:order/:minimun/:maximun", async (req , res) => {
  try {
    
    const productList= await ProductService.search(req.params);
    
    var number = productList["number"]
    var list = productList["listProduct"]

    
    return successCbkProduct(res, 200, { number }, { list });
    
  } catch (error) {

    return res.status(201).send({error });
    
  }
});

router.get('/user/:id/:page', async (req, res) => {
  try {
    const productList = await ProductService.getProductsFrom(req.params.id, req.params.page);
    var number = productList["number"]
    var list = productList["listProduct"]
    
    
    return successCbkProduct(res, 200, { number }, { list });
  } catch (error) {
    return res.status(201).send({ error });
  }
});

router.get('/list/:id', async (req, res) => {
  try {
    console.log("poya")
    const productList = await ProductService.getListId(req.params.id);
    console.log(productList);
    return successCbk(res, 200, { productList });
  } catch (error) {
    return res.status(201).send({ error });
  }
});

module.exports = router;
