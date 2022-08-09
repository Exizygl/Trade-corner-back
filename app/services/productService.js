const { getByCategory } = require("../daos/categoryDAO");
const ProductDAO = require("../daos/productDAO");
const { signUpCategory, addIdProductToCategory } = require("./categoryService");
const { signUpTag, addIdProductToTag } = require("./tagService");

const uploadImageProduct = async (filename, userId) => {
  
  return await UserDAO.uploadImageUser(newUser);
};


  


const addProduct = async (productInfo, userId) => {
  //console.log("boucle service");
  
  // const productInfo = {}

  // productInfo.title = "velo électrique";
  // productInfo.category = "velo";
  // productInfo.imageProductUrl= ["velo1.jpg"];
  // productInfo.tag = "velo, électrique, pure";
  // productInfo.description = "ceci est une peluche";
  // productInfo.price = 10;
  // productInfo.quantity = 1;
  // productInfo.sellerId = userId;
  
 //console.log("product info : " + JSON.stringify(productInfo));

  var stringTag = productInfo.tags;
  //console.log("stringtag : " + stringTag);
  const TagArray = stringTag.split(",").map(tag => tag.trim());
  //console.log("tag array : " + TagArray);
  const TagList = [];
  for (var i = 0 ; i< TagArray.length; i++) TagList[i] = await signUpTag(TagArray[i]);
  console.log("tag list : " + TagList);
  const TagIdList = [];
  for (var i = 0 ; i< TagList.length; i++) TagIdList[i] = TagList[i]._id;

  console.log("productInfo.category = " + productInfo.category);

//----PROBLEME ICI
  const category = await getByCategory(productInfo.category);
  console.log( "category retrouvé : " + category);
 //const newCategory = await signUpCategory(category)

  //console.log(newCategory)
const product = {};
  product["tagIdList"]= TagIdList;
  product["title"] = productInfo.title;
  product["categoryId"] = category._id;
  //product["category"]= productInfo.category;
  product["imageProductUrl"]= ["velo1.jpg"];
  product["description"] = productInfo.description;
  product["price"] = productInfo.price;
  product["quantity"] = productInfo.quantity;
  product["sellerId"] = userId;

  //console.log("product = " + JSON.stringify(product));


  const newProduct = await ProductDAO.addProduct(product);
  console.log("new product = " + JSON.stringify(newProduct));

  await addIdProductToCategory(category, newProduct); //newproductundefined

  for (var i = 0 ; i< TagList.length; i++) await addIdProductToTag(TagList[i], newProduct);

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

 
module.exports = {
  addProduct,
  uploadImageUser,
  getAllProducts,
  getById,
  getNewProducts
};
