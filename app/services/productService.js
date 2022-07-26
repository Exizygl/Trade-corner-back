const ProductDAO = require("../daos/productDAO");
const jwt = require("jsonwebtoken");


const addProduct = async (product) => {
    
  
    
  
  
    return await ProductDAO.addProduct(product);
  };


  module.exports = {
    addProduct,
  };
  