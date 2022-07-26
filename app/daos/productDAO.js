const ProductModel = require("../models/product.model");




const addProduct = async (product) => await new ProductModel(product).save();


module.exports = {
    addProduct
  };
  