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
    await TagModel.find({ tag: {"$in": labelList} });

    const deleteTag = async (tag) => await TagModel.deleteOne({ _id: ObjectId(tag._id) });

module.exports = {
    signUp,
    getByTag,
    tagInfoUpdate,
    getTags,
    deleteTag
};
