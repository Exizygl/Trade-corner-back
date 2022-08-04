const RoleUserDAO = require("../daos/roleUserDAO");
const adminDAO = require ('../daos/adminDAO');

const RoleUserModel = require("../models/roleUser.model");
const ObjectId = require("mongoose").Types.ObjectId;


// ======= INSCRIPTION ========= //

const getByLabel = async (role) => {

  return await RoleUserDAO.getByLabel(role);
};

const addIdUserToRole = async (role, user) => {
    
    role.userIdList.push(user._id);
    
    return await RoleUserDAO.addIdList(role);
};


// ======= ADMIN========= //

const getAllRoles = async () => { 
    return await RoleUserDAO.getAllRoles();
};

const updateUserRole = async (req) => {

  // vérification droit d'admin
  const admin = await adminDAO.getById(req.userId);
  if (!admin) {
    throw "probléme d'identification - administrateur non reconnu"
  }

  // recuperation de l'objectid pour le role
  const newRole = await RoleUserModel.findOne({label : req.valueChange });
  const idNewRole = newRole._id;

  const userToUpdate = {};
  userToUpdate['role'] = idNewRole;    
  userToUpdate['_id'] = req.userToUpdate;
    
  //update de l'utilisateur
  return await RoleUserDAO.updateUser(userToUpdate);
};

//retire l'id de l'utilisateur de UserIdList d'un role donné
const removeId = async (role, userId) =>{
  role.userIdList.pull(userId);
  return await RoleUserDAO.addIdList(role);
}


module.exports = {
  getByLabel,
  addIdUserToRole,
  getAllRoles,
  updateUserRole,
  removeId,
};
