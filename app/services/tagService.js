const TagDAO = require("../daos/tagDAO");


const signUpTag = async (tag) => {
    const tagExist = await TagDAO.getByTag(tag);
    if (tagExist) return tagExist;
    const newTag = {
        tag : tag
    }
    return await TagDAO.signUp(newTag);

};

const addIdProductToTag = async (tag, product) => {
    tag.productIdList.push(product._id);
    return await TagDAO.tagInfoUpdate(tag);
};


module.exports = {
    signUpTag,
    addIdProductToTag,
    
  };
  