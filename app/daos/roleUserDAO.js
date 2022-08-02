const RoleUserModel = require("../models/roleUser.model");
const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;


const getAllRoles = async () => await  RoleUserModel.find();

const addRole = async (role) => await new RoleUserModel(role).save();

const getByLabel = async (label) => await RoleUserModel.findOne({ label: label });

const addIdList = async (role) =>
  await RoleUserModel.findOneAndUpdate({ _id: ObjectId(role._id) }, role , {
  new: true,
});

const updateUser = async (userToUpdate) =>
{console.log ("entrée boucle DAO ");

// push dans la liste du role - OK
await RoleUserModel.findOneAndUpdate({_id: ObjectId(userToUpdate.role)}, {$push : {userIdList : ObjectId(userToUpdate._id)}});

//update user - OK
 const exUser = await UserModel.findOneAndUpdate({ _id: ObjectId(userToUpdate._id) }, { role : ObjectId(userToUpdate.role)}, {
   new: false,
 });

 //supression de l'idUser dans le tableau de l'ancien role - OK
 const exRole = exUser.role;
 await RoleUserModel.findOneAndUpdate({_id: ObjectId(exRole)}, {$pull: {userIdList : ObjectId(userToUpdate._id)}});
 };
 
  

module.exports = {
    addRole,
    getByLabel,
    addIdList,
    getAllRoles,
    updateUser
  };
  