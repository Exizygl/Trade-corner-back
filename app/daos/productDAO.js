const ProductModel = require('../models/product.model');

const addProduct = async (product) => await new ProductModel(product).save();

const getById = async (id) =>
  await ProductModel.findOne({ _id: id })
    .populate('tagIdList', 'tag')
    .populate('categoryId', 'label')
    .populate('sellerId', 'pseudo');

  const productInfoUpdate = async (product) =>
  await ProductModel.findOneAndUpdate({ _id : product._id }, product, {
    new: true,
  });

const getListId = async (id) =>
  await ProductModel.find({ _id: { "$in": id } },
  {
    archive : false
    }
    )
    .populate('tagIdList', 'tag')
    .populate('categoryId', 'label')
    .populate('sellerId', 'pseudo');

const getAllProducts = async () =>
  await ProductModel.find({
    archive : false
    })
    .populate('tagIdList', 'tag')
    .populate('categoryId', 'label');

const getNewProducts = async () => await ProductModel.find({
  archive : false
  }).sort({ createdAt: -1 }).limit(4).populate('tagIdList', 'tag').populate('categoryId', 'label');

const getByTitle = async (label) =>
  await ProductModel.find({ title: new RegExp(label, "i") })

const getProductsFrom = async (id) =>
  await ProductModel.find({ sellerId: id },
    {
    archive : false
    })
    .populate('tagIdList', 'tag')
    .populate('categoryId', 'label');

const searchCategory = async (search, tagIdList, categoryIdList, orderType, orderValue, minimun, maximun) => await ProductModel.find({
  $or: [
    { "title": { "$in": search } },
    { "description": { "$in": search } },
    { "_id": { "$in": tagIdList } }
  ],
    archive : false
  ,
  "categoryId": { "$in": categoryIdList }
  , "price": { "$gte": minimun, "$lte": maximun }
})
  .sort({ [orderType]: orderValue })
  .populate('tagIdList', 'tag')
  .populate('categoryId', 'label')
  .populate('sellerId', 'pseudo');

const search = async (search, tagIdList, orderType, orderValue, minimun, maximun) => await ProductModel.find({
  $or: [
    { "title": { "$in": search } },
    { "description": { "$in": search } },
    { "_id": { "$in": tagIdList } },
  ],
    archive : false,
  "price": { "$gte": minimun, "$lte": maximun }
})
  .sort({ [orderType]: orderValue })
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
  getByTitle,
  getProductsFrom,
  getListId,
  productInfoUpdate
};
