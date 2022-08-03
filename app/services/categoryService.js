const CategoryDAO = require("../daos/categoryDAO");


const signUpCategory = async (category) => {

    console.log(category.label)
    const categoryExist = await CategoryDAO.getByCategory(category.label);
    if (categoryExist) return categoryExist;
    console.log(category)

    return await CategoryDAO.signUp(category);

};

const addIdProductToCategory = async (category, product) => {
    console.log(product._id)
    category.productIdList.push(product._id);
    console.log(category)
    
    return await CategoryDAO.categoryInfoUpdate(category);
};



module.exports = {
    signUpCategory,
    addIdProductToCategory,
    
  };
  