const ProductModel = require("../models/product.model");

const addProduct = async (product) => await new ProductModel(product).save();

const getById = async (id) => await ProductModel.findOne({ _id: id }).populate('tagIdList', 'tag').populate('categoryId', 'label').populate('sellerId', 'pseudo');

const getAllProducts = async () => await ProductModel.find().populate('tagIdList', 'tag').populate('categoryId', 'label');
const getNewProducts = async () => await ProductModel.find().sort({createdAt: -1}).limit(4).populate('tagIdList', 'tag').populate('categoryId', 'label');

const search = async (bar) => await ProductModel.find({"title": {
  "$regex": bar
}}).populate('tagIdList', 'tag').populate('categoryId', 'label').populate('sellerId', 'pseudo');

module.exports = {
    addProduct,
    getById,
    getAllProducts,
    getNewProducts,
    search,
  };
  