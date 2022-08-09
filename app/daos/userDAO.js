const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

// ======= INSCRIPTION ========= //

const signUp = async (user) => await new UserModel(user).save();

const confirmRegistration = async (user) =>
  await UserModel.findOneAndUpdate(
    { _id: user._id },
    { isValid: true },
    { new: true }
  );

// ======= RECHERCHE ========= //

const getByEmail = async (email) =>
  await UserModel.findOne({ email: new RegExp("^" + email + "$", "i") })
    .populate("role", "label")
    .populate("adress", ["street", "zipcode", "city"]);

const getByPseudo = async (pseudo) =>
  await UserModel.findOne({ pseudo: new RegExp("^" + pseudo + "$", "i") });

const getById = async (id) =>
  await UserModel.findOne({ _id: id })
    .populate("role", "label")
    .populate("adress", ["street", "zipcode", "city"]);

// const checkEmail = async (email) => await UserModel.findOne;

// ======= MODIFICATIONS ========= //

const userInfoUpdate = async (user) =>
  await UserModel.findOneAndUpdate({ _id: ObjectId(user._id) }, user, {
    new: true,
  });

const uploadImageUser = async (user) =>
  await UserModel.findOneAndUpdate({ _id: ObjectId(user._id) }, user, {
    new: true,
  });

module.exports = {
  signUp,
  confirmRegistration,
  getByEmail,
  getByPseudo,
  getById,
  userInfoUpdate,
  uploadImageUser,
};
