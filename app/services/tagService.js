const TagDAO = require("../daos/tagDAO");


const signUpTag = async (tag) => {
    console.log("signup tag : " + tag);
    const tagExist = await TagDAO.getByTag(tag);
    if (tagExist) return tagExist;

    const newTag = {
        tag : tag
    }

    return await TagDAO.signUp(newTag);

};

const addIdProductToTag = async (tag, product) => {
    console.log("service tag" + JSON.stringify(product));
    tag.productIdList.push(product._id);
    
   
    return await TagDAO.tagInfoUpdate(tag);
};


module.exports = {
    signUpTag,
    addIdProductToTag,
    
  };
  