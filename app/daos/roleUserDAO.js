const RoleUserModel = require("../models/roleUser.model");
const ObjectId = require("mongoose").Types.ObjectId;


const addRole = async (role) => await new RoleUserModel(role).save();

const getByLabel = async (label) =>
  await RoleUserModel.findOne({ label: label });

  const addIdList = async (role) =>
  await RoleUserModel.findOneAndUpdate({ _id: ObjectId(role._id) }, role , {
    new: true,
  });
  


module.exports = {
    addRole,
    getByLabel,
    addIdList
  };
  