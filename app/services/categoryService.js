const CategoryDAO = require("../daos/categoryDAO");



const signUpCategory = async (category) => {

    console.log(category.label)
    const categoryExist = await CategoryDAO.getByCategory(category.label);
    if (categoryExist) return categoryExist;
    console.log(category)

    return await CategoryDAO.signUp(category);

};

const addIdProductToCategory = async (category, product) => {
    console.log("service addIdProduct to category");
    const categoryExist = await CategoryDAO.getByCategory(category.label);
    //console.log("category existe : " + JSON.stringify(categoryExist));
    //console.log("product : "+ JSON.stringify(product));
    categoryExist.productIdList.push(product._id);
    
    
    return await CategoryDAO.categoryInfoUpdate(categoryExist);
};
const getAllCategory = async () => { 
    return await CategoryDAO.getAllCategory();
};


module.exports = {
    signUpCategory,
    addIdProductToCategory,
    getAllCategory,
    
  };
  