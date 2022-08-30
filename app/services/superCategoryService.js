const SuperCategoryDAO = require("../daos/superCategoryDAO");




const getAllSuperCategory = async () => { 
 
    return await SuperCategoryDAO.getAllSuperCategory();
};
const getBySuperCategory = async (superCategory) => { 
    return await SuperCategoryDAO.getBySuperCategory(superCategory);
};


module.exports = {
    getBySuperCategory,
    getAllSuperCategory
    
  };
  