const TagModel = require("../models/tag.model");
const ObjectId = require("mongoose").Types.ObjectId;

const signUp = async (tag) => await new TagModel(tag).save();


const getByTag = async (tag) =>
    await TagModel.findOne({ tag: new RegExp("^" + tag + "$", "i") });

const tagInfoUpdate = async (tag) =>
    await TagModel.findOneAndUpdate({ _id: ObjectId(tag._id) }, tag, {
        new: true,
    });

    const getTags = async (labelList) =>
    await TagModel.find({ label: {"$in": labelList} });

module.exports = {
    signUp,
    getByTag,
    tagInfoUpdate,
    getTags
};
