const ProductModel = require("../models/product.model");

const addProduct = async (product) => {console.log ("boucle dao");
await new ProductModel(product).save();}


module.exports = {
    addProduct
  };
  