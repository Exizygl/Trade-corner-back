const RoleUserDAO = require("../daos/roleUserDAO");

// ======= INSCRIPTION ========= //

const getByLabel = async (role) => {

  return await RoleUserDAO.getByLabel(role);
};

const addIdUserToRole = async (role, user) => {
    
    role.userIdList.push(user._id);
    
    return await RoleUserDAO.addIdList(role);
  };
  


module.exports = {
  getByLabel,
  addIdUserToRole,
};
