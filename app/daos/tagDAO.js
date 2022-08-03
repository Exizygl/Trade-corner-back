const TagModel = require("../models/tag.model");

const signUp = async (tag) => await new TagModel(tag).save();


const getByTag = async (tag) =>
    await TagModel.findOne({ tag: new RegExp("^" + tag + "$", "i") });

const tagInfoUpdate = async (tag) =>
    await TagModel.findOneAndUpdate({ _id: ObjectId(tag._id) }, tag, {
        new: true,
    });

module.exports = {
    signUp,
    getByTag,
    tagInfoUpdate,
};
