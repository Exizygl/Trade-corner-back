const RoleUserModel = require("../models/roleUser.model");
const ObjectId = require("mongoose").Types.ObjectId;


const getAllRoles = async () => await  RoleUserModel.find();



const addRole = async (role) => await new RoleUserModel(role).save();

const getByLabel = async (label) =>
  await RoleUserModel.findOne({ label: label });

  const addIdList = async (role) =>
  await RoleUserModel.findOneAndUpdate({ _id: ObjectId(role._id) }, role , {
    new: true,
  });

const updateUser = async (userToUpdate) =>
{console.log ("entrée boucle DAO : " + JSON.stringify(userToUpdate));
// push dans la liste du role - OK
//await RoleUserModel.findOneAndUpdate({_id: ObjectId(userToUpdate.role)}, {$push : {userIdList : ObjectId(userToUpdate._id)}});

// enlever dans la liste ancienne
//update user

  await UserModel.findOneAndUpdate({ _id: ObjectId(userToUpdate._id) }, { role : ObjectId(userToUpdate.role)}, {
  new: true,
})
 };
 
  


module.exports = {
    addRole,
    getByLabel,
    addIdList,
    getAllRoles,
    updateUser
  };
  