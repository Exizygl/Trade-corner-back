const { getByCategory, getIdByCategory } = require("../daos/categoryDAO");

const ProductDAO = require("../daos/productDAO");
const { getBySuperCategory } = require("../daos/superCategoryDAO");
const { getTags } = require("../daos/tagDAO");
const { signUpCategory, addIdProductToCategory } = require("./categoryService");
const { signUpTag, addIdProductToTag } = require("./tagService");


const addProduct = async (files, productInfo, userId) => {
  // --------------------- GESTION DES TAGS ----------------------

  var stringTag = productInfo.tags;
  const TagArray = stringTag.split(',').map((tag) => tag.trim());

  //On crée les tags si ils n'existe pas, ou on récupére le tag existant si il existe
  const TagList = [];
  for (var i = 0; i < TagArray.length; i++)
    TagList[i] = await signUpTag(TagArray[i]);

  // on ne garde que les TagId
  const TagIdList = [];
  for (var i = 0; i < TagList.length; i++) TagIdList[i] = TagList[i]._id;

  // --------------------- GESTION DES CATEGORIES ----------------------

  const category = await getByCategory(productInfo.category);

  // --------------------- GESTION DES IMAGES ----------------------

  var imageProductUrl = [];
  for (i = 0; i < files.length; i++) {
    imageProductUrl.push('products/' + files[i].filename);
  }

  // --------------------- CREATION ET ENREGISTREMENT DU PRODUIT ----------------------

  const product = {};
  product['tagIdList'] = TagIdList;
  product['title'] = productInfo.title;
  product['categoryId'] = category._id;
  product['imageProductUrl'] = imageProductUrl;
  product['description'] = productInfo.description;
  product['price'] = productInfo.price;
  product['quantity'] = productInfo.quantity;
  product['sellerId'] = userId;

  const newProduct = await ProductDAO.addProduct(product);

  // --------------------- AJOUT DU PRODUCTID DANS LES COLLECTIONS TAG ET CATEGORIES ----------------------
  await addIdProductToCategory(category, newProduct);

  for (var i = 0; i < TagList.length; i++)
    await addIdProductToTag(TagList[i], newProduct);

  return newProduct;
};

const modifyProduct = async (files, productInfo, userId) => {
  console.log("ça rentre dns la boucle service")
};
const getProductsFrom = async (id) => await ProductDAO.getProductsFrom(id);

const getById = async (id) => await ProductDAO.getById(id);

const getListId = async (id) => {
  console.log(id)
  var search = id.split(",").map(id => id.trim());
  console.log(search)

  return await ProductDAO.getListId(search);
}

const getAllProducts = async () => await ProductDAO.getAllProducts();

const getNewProducts = async () => await ProductDAO.getNewProducts();



const search = async (params) => {


  var result = []

  //--------------------------création des Regular expression------------------------------
  if (params.search == "null" || params.search == "all") {

    var myRegex = new RegExp("", "i");
  } else {
    var search = params.search.split(",").map(tag => tag.trim());
    if (search[0] == "") search.shift()

    var myRegex = search.map(function (e) { return new RegExp(e, "i"); });
  };


  var superCategory = params.superCategory
  var category = params.category
  var order = params.order
  var minimun = params.minimun * 100
  var maximun = params.maximun * 100

  var tagIdList = []
  var categoryIdList = ""
  var orderType = ""
  var orderValue

  //-------------------préparation des variables pour l'ordre des produits---------------------- 
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

  //----------------------------Recherche Id des produits ayant les tags envoyés-------------------------------
  var getTag = await getTags(myRegex)

  for (var i = 0; i < getTag.length; i++) {
    for (var y = 0; y < getTag[i].productIdList.length; y++) {

      tagIdList.push(getTag[i].productIdList[y])

    }
  }

  //---------------------------Recherche Id des sous categories des produits---------------------------------
  if (superCategory != 'all') {
    var getList = await getBySuperCategory(superCategory);
    categoryIdList = getList.categoryIdList;



  }

  if (category != "all") {
    var getList = await getIdByCategory(category);
    categoryIdList = getList;
  }




  if (categoryIdList == "") {

    var listProduct = await ProductDAO.search(myRegex, tagIdList, orderType, orderValue, minimun, maximun);

  } else {

    var listProduct = await ProductDAO.searchCategory(myRegex, tagIdList, categoryIdList, orderType, orderValue, minimun, maximun);

  }

  //-----------------------------Selection des produits---------------------------
  var page = params.page - 1 || 0;

  var limit = 12;

  var number = Math.floor(listProduct.length / limit)

  if (listProduct.length % limit != 0) number = number + 1



  result["number"] = number

  result["listProduct"] = listProduct.slice(page * limit, page * limit + limit)
  return result
}



module.exports = {
  addProduct,
  modifyProduct,
  getAllProducts,
  getById,
  getNewProducts,
  search,
  getProductsFrom,
  getListId 
};
