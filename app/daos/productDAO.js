const ProductModel = require("../models/product.model");

const addProduct = async (product) => await new ProductModel(product).save();

const getById = async (id) => await ProductModel.findOne({ _id: id }).populate('tagIdList', 'tag').populate('categoryId', 'label').populate('sellerId', 'pseudo');

const getAllProducts = async () => await ProductModel.find().populate('tagIdList', 'tag').populate('categoryId', 'label');

const getNewProducts = async () => await ProductModel.find().sort({createdAt: -1}).limit(4).populate('tagIdList', 'tag').populate('categoryId', 'label');

const searchPaginationCategory = async (search, page, limit, IdList) => await ProductModel.find({"title": {
  "$regex": search,
  $options:'i'
    }, "categoryId": {"$in": IdList}})
    .skip(page * limit)
    .limit(limit)
    .populate('tagIdList', 'tag')
    .populate('categoryId', 'label')
    .populate('sellerId', 'pseudo');

const searchPagination = async (search, page, limit) => await ProductModel.find({"title": {
  "$regex": search,
  $options:'i'
    }})
    .skip(page * limit)
    .limit(limit)
    .populate('tagIdList', 'tag')
    .populate('categoryId', 'label')
    .populate('sellerId', 'pseudo');

const search = async (search) => await ProductModel.find({"title": {
  "$regex": search,
  $options:'i'
    }})
const searchCategory = async (search, IdList) => await ProductModel.find({"title": {
  "$regex": search,
  $options:'i'
    }, "categoryId": {"$in": IdList}})

module.exports = {
    addProduct,
    getById,
    getAllProducts,
    getNewProducts,
    searchPagination,
    searchPaginationCategory,
    search,
    searchCategory,
  };
  