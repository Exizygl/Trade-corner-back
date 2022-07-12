const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

const signUp = async (user) => await new UserModel(user).save();

const getByEmail = async (email) =>
  await UserModel.findOne({ email: new RegExp("^" + email + "$", "i") });

const getByPseudo = async (email) =>
  await UserModel.findOne({ pseudo: new RegExp("^" + pseudo + "$", "i") });

const getById = async (id) => await UserModel.findOne({ _id: id });

const userInfoUpdate = async (user) =>
  await UserModel.findOneAndUpdate({ _id: ObjectId(user._id) }, user, {
    new: true,
  });



const confirmRegistration = async (user) =>
  await UserModel.findOneAndUpdate(
    { _id: user._id },
    { isValid: true },
    { new: true }
  );

module.exports = {
  signUp,
  getByEmail,
  getByPseudo,
  getById,
  userInfoUpdate,
  confirmRegistration,
};
