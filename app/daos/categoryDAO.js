const CategoryModel = require("../models/tag.model");

const signUp = async (category) => await new CategoryModel(category).save();


const getByCategory = async (category) =>
    await CategoryModel.findOne({ category: new RegExp("^" + category + "$", "i") });

const categoryInfoUpdate = async (category) =>
    await CategoryModel.findOneAndUpdate({ _id: ObjectId(category._id) }, category, {
        new: true,
    });

module.exports = {
    signUp,
    getByCategory,
    categoryInfoUpdate,
};
