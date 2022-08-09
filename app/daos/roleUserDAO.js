const RoleUserModel = require("../models/roleUser.model");
const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;


const getAllRoles = async () => await RoleUserModel.find();

const addRole = async (role) => await new RoleUserModel(role).save();

const getByLabel = async (label) => await RoleUserModel.findOne({ label: label });

const addIdList = async (role) =>
  await RoleUserModel.findOneAndUpdate({ _id: ObjectId(role._id) }, role , {
  new: true,
});

const updateUser = async (userToUpdate) =>
{// push de l'idUser dans la liste du nouveau role
await RoleUserModel.findOneAndUpdate({_id: ObjectId(userToUpdate.role)}, {$push : {userIdList : ObjectId(userToUpdate._id)}});

//update user
 const exUser = await UserModel.findOneAndUpdate({ _id: ObjectId(userToUpdate._id) }, { role : ObjectId(userToUpdate.role)}, {
   new: false,
 });

 //supression de l'idUser dans la liste de l'ancien role
 const exRole = exUser.role;
 await RoleUserModel.findOneAndUpdate({_id: ObjectId(exRole)}, {$pull: {userIdList : ObjectId(userToUpdate._id)}});
 };
 
  

module.exports = {
  getAllRoles,
  addRole,
  getByLabel,
  addIdList,
  updateUser
};
  