const ProductDAO = require("../daos/productDAO");
const { signUpCategory, addIdProductToCategory } = require("./categoryService");
const { signUpTag, addIdProductToTag } = require("./tagService");




const addProduct = async (productInfo2, userId) => {
  
  const productInfo = {}

  productInfo.title = "velo électrique";
  productInfo.category = "velo";
  productInfo.imageProductUrl= ["velo1.jpg"];
  productInfo.tag = "velo, électrique, pure";
  productInfo.description = "ceci est une peluche";
  productInfo.price = 10;
  productInfo.quantity = 1;
  productInfo.sellerId = userId;
  
  const product = {}


 console.log(productInfo)



  var stringTag = productInfo.tag;
  console.log(stringTag)
  const TagArray = stringTag.split(",").map(tag => tag.trim());
  console.log(TagArray)
  const TagList = [];
  
  for (var i = 0 ; i< TagArray.length; i++) TagList[i] = await signUpTag(TagArray[i]);

  console.log(TagList)
  
  const TagIdList = []
  
  for (var i = 0 ; i< TagList.length; i++) TagIdList[i] = TagList[i]._id;


  const category = {
    label : productInfo.category
  }

  const newCategory = await signUpCategory(category)

  console.log(newCategory)

  product["tagIdList"]= TagIdList;
  product["title"] = productInfo.title;
  product["categoryId"] = newCategory._id;
  product["imageProductUrl"]= productInfo.imageProductUrl;
  product["description"] = productInfo.description;
  product["price"] = productInfo.price;
  product["quantity"] = productInfo.quantity;
  product["sellerId"] = userId;





  const newProduct = await ProductDAO.addProduct(product);

  await addIdProductToCategory(newCategory, newProduct);

  for (var i = 0 ; i< TagList.length; i++) await addIdProductToTag(TagList[i], newProduct)

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
