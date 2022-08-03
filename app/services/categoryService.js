const CategoryDAO = require("../daos/categoryDAO");


const signUpCategory = async (category) => {

    console.log(category.category)
    const categoryExist = await CategoryDAO.getBycategory(category.category);
    if (categoryExist) return categoryExist;

    return await CategoryDAO.signUp(category);

};

const addIdUserToCategory = async (category, product) => {

    category.userIdList.push(product._id);
    
    
    return await CategoryDAO.addIdList(category);
};



module.exports = {
    signUpCategory,
    addIdUserToCategory,
    
  };
  