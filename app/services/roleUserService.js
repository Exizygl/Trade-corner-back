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

  const UpdateUserRole = async (req) => {
    // vérification droit d'admin
    const admin = await adminDAO.getById(req.userId);
    if (!admin) {
        throw "probléme d'identification - administrateur non reconnu"
    }

    //    
    const userToUpdate = {};
    userToUpdate['_id'] = req.userToUpdate;
    userToUpdate['role'] = req.role;
    return await adminDAO.updateUser(userToUpdate)
    // .then ()


    // const userInfoUpdate = async (user) =>
    // await UserModel.findOneAndUpdate({ _id: ObjectId(userYToUpdate._id) }, userToUpdate, {
    //   new: true,
    // });
  




  };
  


module.exports = {
  getByLabel,
  addIdUserToRole,
  UpdateUserRole,
  getAllRoles,
};
