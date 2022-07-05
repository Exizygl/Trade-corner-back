const UserModel = require("../models/user.model");


const signUp = async (user) => await new UserModel(user).save();

const getByEmail = async (email) => await UserModel.findOne({ email: new RegExp("^" + email + "$", 'i') });

const confirmRegistration = async (user) => await UserModel.findOneAndUpdate({ _id: user._id }, { isValid: true}, { new: true });

module.exports = {
    signUp,
    getByEmail,
    confirmRegistration
}