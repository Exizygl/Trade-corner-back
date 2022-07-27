const ProductDAO = require("../daos/productDAO");



const addProduct = async (productInfo) => {

  const product = {}

  // product["title"] = "test";
  // product["category"] = "test";
  // product["imageProductUrl"]= ["test" , "tata"];
  // product["tag"] = "test";
  // product["description"] = "test";
  // product["price"] = 2350;
  // product["quantity"] = 2;
  // product["seller"] = "62d54c7ebc3d2e55ccb2717a";
  
  product["title"] = productInfo.title;
  product["category"] = productInfo.categorie;
 
 // product["imageProductUrl"]= ["test" , "tata"];
  product["tag"] = productInfo.tag;
  product["description"] = "test";
  product["price"] = 2350;
  product["quantity"] = 2;
  product["sellerId"] = "62d54c7ebc3d2e55ccb2717a";

   console.log(product)


  return await ProductDAO.addProduct(product);
};


module.exports = {
  addProduct,
};
