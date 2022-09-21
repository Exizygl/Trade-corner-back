const router = require('express').Router();
const ProductService = require('../services/productService');
const { hasJWT } = require('../middlewares/jwt');

const successCbk = require('../misc/callbacks').successCbk;
const errorCbk = require('../misc/callbacks').errorCbk;
const uploadProductPhotos = require('../middlewares/uploadProductPhotos');
const upload = require('../middlewares/upload');

router.post('/add', hasJWT, uploadProductPhotos, async (req, res) => {
  console.log('ça rentre dans la route : ');

  try {
    const product = await ProductService.addProduct(
      req.files,
      req.body,
      req.userId
    ); // add product to schema

    // const image = await ProductService.uploadImageUser(
    //   req.file ? req.file.filename : "",
    //   product._id
    // );

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

router.get(
  '/search/:search/:page/:superCategory/:category',
  async (req, res) => {
    try {
      console.log('toya');
      const productList = await ProductService.search(req.params);
      console.log(productList);

      return successCbk(res, 200, { productList });
    } catch (error) {
      return res.status(201).send({ error });
    }
  }
);
router.get(
  '/searchCount/:search/:superCategory/:category',
  async (req, res) => {
    try {
      const number = await ProductService.searchCount(req.params);

      return successCbk(res, 200, { number });
    } catch (error) {
      return res.status(201).send({ error });
    }
  }
);

router.get('/user/:id', async (req, res) => {
  try {
    const productList = await ProductService.getProductsFrom(req.params.id);
    console.log(productList);
    return successCbk(res, 200, { productList });
  } catch (error) {
    return res.status(201).send({ error });
  }
});

module.exports = router;
