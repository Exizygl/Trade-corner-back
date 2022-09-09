const ProductModel = require("../models/product.model");

const addProduct = async (product) => await new ProductModel(product).save();

const getById = async (id) => await ProductModel.findOne({ _id: id }).populate('tagIdList', 'tag').populate('categoryId', 'label').populate('sellerId', 'pseudo');

const getAllProducts = async () => await ProductModel.find().populate('tagIdList', 'tag').populate('categoryId', 'label');

const getNewProducts = async () => await ProductModel.find().sort({createdAt: -1}).limit(4).populate('tagIdList', 'tag').populate('categoryId', 'label');

const searchPaginationCategory = async (search, tagIdlist, page, limit, categoryIdList, orderType, orderValue, minimun, maximun) => await ProductModel.find({"title": {
  "$regex": search,
  $options:'i'
    }, "categoryId": {"$in": categoryIdList}, "price": {"$gt": minimun, "$lt": maximun }})
    .sort({[orderType]: orderValue})
    .skip(page * limit)
    .limit(limit)
    .populate('tagIdList', 'tag')
    .populate('categoryId', 'label')
    .populate('sellerId', 'pseudo');

const searchPagination = async (search, tagIdList, page, limit,  orderType, orderValue, minimun, maximun) => await ProductModel.find({"title": {
  "$regex": search,
  $options:'i'
    }, "price": {"$gt": minimun, "$lt": maximun }})
    .sort({[orderType]: orderValue})
    .skip(page * limit)
    .limit(limit)
    .populate('tagIdList', 'tag')
    .populate('categoryId', 'label')
    .populate('sellerId', 'pseudo');

const search = async (search, minimun, maximun) => await ProductModel.find({"title": {
  "$regex": search,
  $options:'i'
    }, "price": {"$gt": minimun, "$lt": maximun }})
const searchCategory = async (search, IdList, minimun, maximun) => await ProductModel.find({"title": {
  "$regex": search,
  $options:'i'
    }, "categoryId": {"$in": IdList}, "price": {"$gt": minimun, "$lt": maximun }})

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
  