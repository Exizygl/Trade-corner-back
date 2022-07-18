const adminDAO = require("../daos/adminDAO");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const deleteUser = async (req,res,next) => {
    const adminPassword = req.password;
    const admin = await adminDAO.getById(req.userId);
    if (!admin) {
        throw "probléme d'identification - administrateur non reconnu"
    }

    const isMatch = await admin.comparePassword(adminPassword);
    if (!isMatch) {
        throw "Authentication error - wrong password"
    }
    else {
        return await adminDAO.deleteUser(req.userToDeleteId);
    }   
};

module.exports = {
   deleteUser,
  };
  