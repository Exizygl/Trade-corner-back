const SuperCategoryModel = require("../models/superCategory.model");
const ObjectId = require("mongoose").Types.ObjectId;

const signUp = async (category) => await new SuperCategoryModel(category).save();

const getAllSuperCategory = async () => await SuperCategoryModel.find().populate("categoryIdList", "label");

const getBySuperCategory = async (label) =>
    await SuperCategoryModel.findOne({ label: new RegExp("^" + label + "$", "i") })
    





module.exports = {
    signUp,
    getAllSuperCategory,
    getBySuperCategory,
    
};
