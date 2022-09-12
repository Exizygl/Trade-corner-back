const { getByCategory, getIdByCategory } = require("../daos/categoryDAO");

const ProductDAO = require("../daos/productDAO");
const { getBySuperCategory } = require("../daos/superCategoryDAO");
const { getTags } = require("../daos/tagDAO");
const { signUpCategory, addIdProductToCategory } = require("./categoryService");
const { signUpTag, addIdProductToTag } = require("./tagService");





const addProduct = async (files, productInfo, userId) => {

  // --------------------- GESTION DES TAGS ----------------------

  var stringTag = productInfo.tags;
  const TagArray = stringTag.split(",").map(tag => tag.trim());

  //On crée les tags si ils n'existe pas, ou on récupére le tag existant si il existe
  const TagList = [];
  for (var i = 0; i < TagArray.length; i++) TagList[i] = await signUpTag(TagArray[i]);

  // on ne garde que les TagId
  const TagIdList = [];
  for (var i = 0; i < TagList.length; i++) TagIdList[i] = TagList[i]._id;


  // --------------------- GESTION DES CATEGORIES ----------------------

  const category = await getByCategory(productInfo.category);

  // --------------------- GESTION DES IMAGES ----------------------

  var imageProductUrl = [];
  for (i = 0; i < files.length; i++) { imageProductUrl.push("products/" + files[i].filename) };

  // --------------------- CREATION ET ENREGISTREMENT DU PRODUIT ----------------------

  const product = {};
  product["tagIdList"] = TagIdList;
  product["title"] = productInfo.title;
  product["categoryId"] = category._id;
  product["imageProductUrl"] = imageProductUrl;
  product["description"] = productInfo.description;
  product["price"] = productInfo.price;
  product["quantity"] = productInfo.quantity;
  product["sellerId"] = userId;

  const newProduct = await ProductDAO.addProduct(product);


  // --------------------- AJOUT DU PRODUCTID DANS LES COLLECTIONS TAG ET CATEGORIES ----------------------
  await addIdProductToCategory(category, newProduct);

  for (var i = 0; i < TagList.length; i++) await addIdProductToTag(TagList[i], newProduct);

  return newProduct;
};

const getById = async (id) => await ProductDAO.getById(id);

const getAllProducts = async () => await ProductDAO.getAllProducts();

const getNewProducts = async () => await ProductDAO.getNewProducts();

const uploadImageUser = async (filename, id) => {
  const product = await getById(id);

  if (
    filename &&
    user.imageProfilUrl != filename &&
    user.imageProfilUrl != ""
  ) {
    // changing picture
    const oldImagePath = `./public/${user.imageProfilUrl}`;
    if (fs.existsSync(oldImagePath)) {

      fs.unlinkSync(oldImagePath);
    }

  }

  const newUser = Object.assign(user, {
    imageProfilUrl: filename ? filename : user.imageProfilUrl,
  });

  return await UserDAO.uploadImageUser(newUser);
};

const search = async (params) => {

  console.log(params)

  var search = [params.search];

  var superCategory = params.superCategory
  var category = params.category
  var order = params.order
  var minimun = params.minimun * 100
  var maximun = params.maximun * 100

  var IdProduct = await ProductDAO.getByTitle(search)
  console.log("list " + IdProduct)

  var tagIdList = ""
  var categoryIdList = ""
  var orderType = ""
  var orderValue
  if (order == "new" || order == "old") {
    orderType = "createdAt"

    if (order == "new") {
      orderValue = -1
    }
    if (order == "old") {
      orderValue = 1
    }

  } else {
    orderType = "price"

    if (order == "cheap") {
      orderValue = 1
    }
    if (order == "expensive") {
      orderValue = -1
    }
  }

  console.log(search)
  var getTag = await getTags(search)
  tagIdList = getTag[0].productIdList
  console.log(tagIdList)
  if (superCategory != "all") {
    var getList = await getBySuperCategory(superCategory);
    categoryIdList = getList.categoryIdList;


  }

  if (category != "all") {
    console.log(category)
    var getList = await getIdByCategory(category);
    categoryIdList = getList;
    console.log(IdList)


  }
  var page = params.page - 1 || 0;

  var limit = 12

  if (params.search == "null" || params.search == "all") search = "";


  if (categoryIdList == "") {
    console.log("here")
    return await ProductDAO.searchPagination(search, tagIdList, page, limit, orderType, orderValue, minimun, maximun);
  }
  console.log("there")
  return await ProductDAO.searchPaginationCategory(search, tagIdList,page, limit, categoryIdList, orderType, orderValue, minimun, maximun);

}


const searchCount = async (params) => {

  var search = params.search;

  var superCategory = params.superCategory

  var category = params.category
  var minimun = params.minimun * 100
  var maximun = params.maximun * 100

  var IdList = ""

  

  if (superCategory != "all") {
    var getList = await getBySuperCategory(superCategory);
    IdList = getList.categoryIdList;
  }
  if (category != "all") {

    var getList = await getIdByCategory(category);
    IdList = getList;

  }
  var numberProduct = ""
  if (params.search == "null" || params.search == "all") search = "";

  if (IdList == "") {

    numberProduct = await ProductDAO.search(search, minimun, maximun);
  } else {

    numberProduct = await ProductDAO.searchCategory(search, IdList, minimun, maximun);
  }



  var number = Math.floor(numberProduct.length / 12)
  console.log(number)
  if (numberProduct.length % 12 != 0)
    return number + 1
  return number

}
module.exports = {
  addProduct,
  uploadImageUser,
  getAllProducts,
  getById,
  getNewProducts,
  search,
  searchCount
};
