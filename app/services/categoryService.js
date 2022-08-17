const CategoryDAO = require("../daos/categoryDAO");



const signUpCategory = async (category) => {
    const categoryExist = await CategoryDAO.getByCategory(category.label);
    if (categoryExist) return categoryExist;
    return await CategoryDAO.signUp(category);
};

const addIdProductToCategory = async (category, product) => {
    const categoryExist = await CategoryDAO.getByCategory(category.label);
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
  