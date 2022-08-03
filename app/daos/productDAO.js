const ProductModel = require("../models/product.model");

const addProduct = async (product) => await new ProductModel(product).save();

const getById = async (id) => await ProductModel.findOne({ _id: id }).populate('tags').populate('adress', ['street', 'zipcode', 'city']);

module.exports = {
    addProduct,
    getById,
  };
  