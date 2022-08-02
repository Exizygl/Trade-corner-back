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

    const userToUpdate = {};
    userToUpdate['_id'] = req.userToUpdate;
    //console.log (" utilisateur modifiée = " + JSON.stringify(userToUpdate));
    
    // recuperation de l'objectid pour le role
    const newRole = await RoleUserModel.findOne({label : req.valueChange });
    //console.log("new role : " + JSON.stringify(newRole));
    const idNewRole = newRole._id;
    userToUpdate['role'] = idNewRole;
    console.log("userToupdate = " + JSON.stringify(userToUpdate));
     
    //update de l'utilisateur

    return await RoleUserDAO.updateUser(userToUpdate);

    //ajout dans list id




    //return await adminDAO.updateUser(userToUpdate)
    // .then ()


    // const userInfoUpdate = async (user) =>
    return await UserModel.findOneAndUpdate({ _id: ObjectId(userToUpdate._id) }, userToUpdate, {
      new: true,
    });

  };
  
const removeId = async (role, userId) =>{
   
    
    role.userIdList.pull(userId);
   
    return await RoleUserDAO.addIdList(role);
}


module.exports = {
  getByLabel,
  addIdUserToRole,
  updateUserRole,
  getAllRoles,
  removeId,
};
