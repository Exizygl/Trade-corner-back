const ProductModel = require('../models/product.model');

const addProduct = async (product) => await new ProductModel(product).save();

const getById = async (id) =>
  await ProductModel.findOne({ _id: id })
    .populate('tagIdList', 'tag')
    .populate('categoryId', 'label')
    .populate('sellerId', 'pseudo');

const getAllProducts = async () =>
  await ProductModel.find()
    .populate('tagIdList', 'tag')
    .populate('categoryId', 'label');

<<<<<<< HEAD
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
=======
const getNewProducts = async () =>
  await ProductModel.find()
    .sort({ createdAt: -1 })
    .limit(4)
    .populate('tagIdList', 'tag')
    .populate('categoryId', 'label');

const getProductsFrom = async (id) =>
  await ProductModel.find({ sellerId: id })
    .populate('tagIdList', 'tag')
    .populate('categoryId', 'label');

const searchPaginationCategory = async (search, page, limit, IdList) =>
  await ProductModel.find({
    title: {
      $regex: search,
      $options: 'i',
    },
    categoryId: { $in: IdList },
  })
    .skip(page * limit)
    .limit(limit)
>>>>>>> origin/getProductsFrom
    .populate('tagIdList', 'tag')
    .populate('categoryId', 'label')
    .populate('sellerId', 'pseudo');

<<<<<<< HEAD



=======
const searchPagination = async (search, page, limit) =>
  await ProductModel.find({
    title: {
      $regex: search,
      $options: 'i',
    },
  })
    .skip(page * limit)
    .limit(limit)
    .populate('tagIdList', 'tag')
    .populate('categoryId', 'label')
    .populate('sellerId', 'pseudo');

const search = async (search) =>
  await ProductModel.find({
    title: {
      $regex: search,
      $options: 'i',
    },
  });
const searchCategory = async (search, IdList) =>
  await ProductModel.find({
    title: {
      $regex: search,
      $options: 'i',
    },
    categoryId: { $in: IdList },
  });
>>>>>>> origin/getProductsFrom

module.exports = {
  addProduct,
  getById,
  getAllProducts,
  getNewProducts,
<<<<<<< HEAD
  search,
  searchCategory,
  getByTitle
=======
  searchPagination,
  searchPaginationCategory,
  search,
  searchCategory,
  getProductsFrom,
>>>>>>> origin/getProductsFrom
};
