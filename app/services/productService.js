const { getByCategory } = require("../daos/categoryDAO");
const ProductDAO = require("../daos/productDAO");
const { signUpCategory, addIdProductToCategory } = require("./categoryService");
const { signUpTag, addIdProductToTag } = require("./tagService");





const addProduct = async (files, productInfo, userId) => {

  // --------------------- GESTION DES TAGS ----------------------

  var stringTag = productInfo.tags;
  const TagArray = stringTag.split(",").map(tag => tag.trim());

   //On crée les tags si ils n'existe pas, ou on récupére le tag existant si il existe
  const TagList = []; 
  for (var i = 0 ; i< TagArray.length; i++) TagList[i] = await signUpTag(TagArray[i]);
  
  // on ne garde que les TagId
  const TagIdList = [];
  for (var i = 0 ; i< TagList.length; i++) TagIdList[i] = TagList[i]._id;

 
 // --------------------- GESTION DES CATEGORIES ----------------------

const category = await getByCategory(productInfo.category);

 // --------------------- GESTION DES IMAGES ----------------------

 var imageProductUrl = [];
 for (i=0; i<files.length; i++)
 { imageProductUrl.push("products/"+files[i].filename)};

 // --------------------- CREATION ET ENREGISTREMENT DU PRODUIT ----------------------

const product = {};
  product["tagIdList"]= TagIdList;
  product["title"] = productInfo.title;
  product["categoryId"] = category._id;
  product["imageProductUrl"]= imageProductUrl;
  product["description"] = productInfo.description;
  product["price"] = productInfo.price;
  product["quantity"] = productInfo.quantity;
  product["sellerId"] = userId; 

  const newProduct = await ProductDAO.addProduct(product);


 // --------------------- AJOUT DU PRODUCTID DANS LES COLLECTIONS TAG ET CATEGORIES ----------------------
  await addIdProductToCategory(category, newProduct);

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

const search = async (search) => {
  console.log(typeof search);
  console.log(search + " here");
  if (search == "null" || search == "all") search = "" ;
  return await ProductDAO.search(search);
}

module.exports = {
  addProduct,
  uploadImageUser,
  getAllProducts,
  getById,
  getNewProducts,
  search,
};
