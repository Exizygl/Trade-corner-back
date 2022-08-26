const SuperCategoryModel = require("../models/superCategory.model");
const ObjectId = require("mongoose").Types.ObjectId;

const signUp = async (category) => await new SuperCategoryModel(category).save();

const getAllSuperCategory = async () => await SuperCategoryModel.find();

const getBySuperCategory = async (label) =>
    await SuperCategoryModel.findOne({ label: new RegExp("^" + label + "$", "i") });
    

const superCategoryInfoUpdate = async (category) =>
    await SuperCategoryModel.findOneAndUpdate({ _id: ObjectId(category._id) }, category, {
        new: true,
    });



module.exports = {
    signUp,
    getAllSuperCategory,
    getBySuperCategory,
    superCategoryInfoUpdate,
    
};
