const ProductDAO = require("../daos/productDAO");

const uploadImageProduct = async (filename, userId) => {
  
  return await UserDAO.uploadImageUser(newUser);
};



const addProduct = async (productInfo, userId) => {

  console.log("boucle service");

  const product = {}

  // product["title"] = "test";
  // product["category"] = "test";
  // product["imageProductUrl"]= ["test" , "tata"];
  // product["tag"] = "test";
  // product["description"] = "test";
  // product["price"] = 2350;
  // product["quantity"] = 2;
  // product["seller"] = "62d54c7ebc3d2e55ccb2717a";


  
  // var stringTag = productInfo.tag;
  // product["tag"]= stringTag.split(",").map(tag => tag.trim());
  product["tag"] = "tag 1";
  product["title"] = productInfo.title;
  product["category"] = productInfo.category;
  // product["imageProductUrl"]= productInfo.imageProductUrl;
  product["description"] = productInfo.description;
  product["price"] = productInfo.price;
  product["quantity"] = productInfo.quantity;
  product["sellerId"] = userId;


   console.log(product)


  return await ProductDAO.addProduct(product);
};


module.exports = {
  addProduct,
};
