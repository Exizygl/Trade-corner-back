const ProductDAO = require("../daos/productDAO");
const { addIdUserToCategory, signUpCategory } = require("./categoryService");
const { signUpTag, addIdUserToTag } = require("./tagService");




const addProduct = async (productInfo2, userId) => {
  
  const productInfo = {}

  productInfo.title = "Canapé";
  productInfo.category = "Meuble";
  productInfo.imageProductUrl= ["canape1.jpg"];
  productInfo.tag = "canapé, 3 places";
  productInfo.description = "ceci est un canapé";
  productInfo.price = 2350;
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

  
  
  const TagIdList = []
  
  for (var i = 0 ; i< TagList.length; i++) TagIdList[i] = TagArray[i]._id;


  const category = {
    category : productInfo.category
  }

  const newCategory = await signUpCategory(category)

  console.log(newCategory)

  product["tag"]= TagIdList;
  product["title"] = productInfo.title;
  product["category"] = newCategory._id;
  product["imageProductUrl"]= productInfo.imageProductUrl;
  product["description"] = productInfo.description;
  product["price"] = productInfo.price;
  product["quantity"] = productInfo.quantity;
  product["sellerId"] = userId;


console.log(product)


  const newProduct = await ProductDAO.addProduct(product);

  await addIdUserToCategory(category, newProduct);

  for (var i = 0 ; i< TagList.length; i++) await addIdUserToTag(TagList[i], newProduct)

  return newProduct;
};

const getById = async (id) => await ProductDAO.getById(id);

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
  uploadImageUser
};
