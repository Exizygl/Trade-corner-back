const TagDAO = require("../daos/tagDAO");


const signUpTag = async (tag) => {
    console.log(tag);
    const tagExist = await TagDAO.getByTag(tag);
    if (tagExist) return tagExist;

    const newTag = {
        tag : tag
    }

    return await TagDAO.signUp(newTag);

};

const addIdUserToTag = async (tag, product) => {

    tag.userIdList.push(product._id);
    
    
    return await TagDAO.addIdList(tag);
};


module.exports = {
    signUpTag,
    addIdUserToTag,
    
  };
  