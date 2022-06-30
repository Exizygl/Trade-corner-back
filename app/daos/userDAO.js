const UserModel = require("../models/user.model");


const signUp = async (user) => await new UserModel(user).save();

const getByEmail = async (email) => await UserModel.findOne({ email: new RegExp("^" + email + "$", 'i') });


module.exports = {
    signUp,
    getByEmail
}