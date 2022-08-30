const CategoryModel = require("../models/category.model");
const ObjectId = require("mongoose").Types.ObjectId;

const signUp = async (category) => await new CategoryModel(category).save();

const getAllCategory = async () => await CategoryModel.find();

const getByCategory = async (label) =>
    await CategoryModel.findOne({ label: new RegExp("^" + label + "$", "i") });
    //await CategoryModel.findOne({label : label});

const getIdByCategory = async (label) =>
    await CategoryModel.findOne({ label: new RegExp("^" + label + "$", "i") });
    //await CategoryModel.findOne({label : label});

const categoryInfoUpdate = async (category) =>
    await CategoryModel.findOneAndUpdate({ _id: ObjectId(category._id) }, category, {
        new: true,
    });



module.exports = {
    signUp,
    getAllCategory,
    getByCategory,
    getIdByCategory,
    categoryInfoUpdate,
    
};
