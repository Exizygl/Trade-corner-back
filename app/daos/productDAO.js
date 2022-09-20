const ProductModel = require("../models/product.model");

const addProduct = async (product) => await new ProductModel(product).save();

const getById = async (id) => await ProductModel.findOne({ _id: id }).populate('tagIdList', 'tag').populate('categoryId', 'label').populate('sellerId', 'pseudo');

const getAllProducts = async () => await ProductModel.find().populate('tagIdList', 'tag').populate('categoryId', 'label');

const getNewProducts = async () => await ProductModel.find().sort({ createdAt: -1 }).limit(4).populate('tagIdList', 'tag').populate('categoryId', 'label');

const getByTitle = async (label) =>
    await ProductModel.find({ title: new RegExp(label, "i") })


const searchPaginationCategory = async (search, tagIdList, page, limit, categoryIdList, orderType, orderValue, minimun, maximun) => await ProductModel.find({
  $or :[
    {"title": {"$in": search}},
    {"_id": {"$in": tagIdList}},
  ], "categoryId": { "$in": categoryIdList }, "price": { "$gte": minimun, "$lte": maximun }
})
  .sort({ [orderType]: orderValue })
  .skip(page * limit)
  .limit(limit)
  .populate('tagIdList', 'tag')
  .populate('categoryId', 'label')
  .populate('sellerId', 'pseudo');

const searchPagination = async (search, tagIdList, page, limit,  orderType, orderValue, minimun, maximun) => await ProductModel.find({
   $or :[
    {"title": {"$in": search}},
    {"_id": {"$in": tagIdList}}
  ],
    "price": {"$gte": minimun, "$lte": maximun }})
    .sort({[orderType]: orderValue})
    .skip(page * limit)
    .limit(limit)
    .populate('tagIdList', 'tag')
    .populate('categoryId', 'label')
    .populate('sellerId', 'pseudo');




const search = async (search, tagIdList, minimun, maximun) => await ProductModel.find({
   $or :[
    {"title": {"$in": search}},
    {"_id": {"$in": tagIdList}}
  ], "price": { "$gt": minimun, "$lt": maximun }
})
const searchCategory = async (search, tagIdList, IdList, minimun, maximun) => await ProductModel.find({
  $or :[
    {"title": {"$in": search}},
    {"_id": {"$in": tagIdList}}
  ], "categoryId": { "$in": IdList }, "price": { "$gt": minimun, "$lt": maximun }
})

module.exports = {
  addProduct,
  getById,
  getAllProducts,
  getNewProducts,
  searchPagination,
  searchPaginationCategory,
  search,
  searchCategory,
  getByTitle
};
