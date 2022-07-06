const UserModel = require("../models/user.model");
const ObjectId = require('mongoose').Types.ObjectId;



const signUp = async (user) => await new UserModel(user).save();

const getByEmail = async (email) => await UserModel.findOne({ email: new RegExp("^" + email + "$", 'i') });

const getById = async (id) => await UserModel.findOne({ _id: id });

const userInfoUpdate = async (user) => await UserModel.findOneAndUpdate({ _id: ObjectId(user._id) }, user, { new: true })


module.exports = {
    signUp,
    getByEmail,
    getById,
    userInfoUpdate
}