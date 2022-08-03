const CategoryModel = require("../models/category.model");

const signUp = async (category) => await new CategoryModel(category).save();


const getByCategory = async (label) =>
    await CategoryModel.findOne({ label: new RegExp("^" + label + "$", "i") });

const categoryInfoUpdate = async (category) =>
    await CategoryModel.findOneAndUpdate({ _id: ObjectId(category._id) }, category, {
        new: true,
    });

module.exports = {
    signUp,
    getByCategory,
    categoryInfoUpdate,
};
