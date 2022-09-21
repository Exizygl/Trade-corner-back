const ProductModel = require("../models/product.model");

const addProduct = async (product) => await new ProductModel(product).save();

const getById = async (id) => await ProductModel.findOne({ _id: id }).populate('tagIdList', 'tag').populate('categoryId', 'label').populate('sellerId', 'pseudo');

const getAllProducts = async () => await ProductModel.find().populate('tagIdList', 'tag').populate('categoryId', 'label');

const getNewProducts = async () => await ProductModel.find().sort({ createdAt: -1 }).limit(4).populate('tagIdList', 'tag').populate('categoryId', 'label');

const getByTitle = async (label) =>
    await ProductModel.find({ title: new RegExp(label, "i") })


const searchCategory = async (search, tagIdList, categoryIdList, orderType, orderValue, minimun, maximun) => await ProductModel.find({
  $or :[
    {"title": {"$in": search}},
    {"_id": {"$in": tagIdList}},
  ], "categoryId": { "$in": categoryIdList }, "price": { "$gte": minimun, "$lte": maximun }
})
  .sort({ [orderType]: orderValue })
  .populate('tagIdList', 'tag')
  .populate('categoryId', 'label')
  .populate('sellerId', 'pseudo');

const search = async (search, tagIdList,  orderType, orderValue, minimun, maximun) => await ProductModel.find({
   $or :[
    {"title": {"$in": search}},
    {"_id": {"$in": tagIdList}}
  ],
    "price": {"$gte": minimun, "$lte": maximun }})
    .sort({[orderType]: orderValue})
    .populate('tagIdList', 'tag')
    .populate('categoryId', 'label')
    .populate('sellerId', 'pseudo');





module.exports = {
  addProduct,
  getById,
  getAllProducts,
  getNewProducts,
  search,
  searchCategory,
  getByTitle
};
