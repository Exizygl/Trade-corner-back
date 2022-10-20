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


const deleteTag = async (tag, id) => {
    var objectTag = await TagDAO.getByTag(tag)
    console.log(objectTag)
    objectTag.productIdList.pull(id);
    
    if (!objectTag.productIdList[0]) return await TagDAO.deleteTag(objectTag);
    return await TagDAO.tagInfoUpdate(objectTag);
};


module.exports = {
    signUpTag,
    addIdProductToTag,
    deleteTag
    
  };
  