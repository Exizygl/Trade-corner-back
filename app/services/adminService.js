const adminDAO = require("../daos/adminDAO");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const deleteUser = async (req,res,next) => {
    const adminPassword = req.password;
    try {
        console.log("attention du back : " + JSON.stringify(req));
        adminDAO.getById(req.userId)
        .then (async (user) => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });}
            const isMatch = await user.comparePassword(adminPassword);
            if (!isMatch) {
                throw "Authentication error - wrong password"}
            //     return res.status(500).json({ msg: error })}
            else {
                return await adminDAO.deleteUser(req.userToDeleteId);
            }
        })
        .catch ((error) => {
            console.log("une erreur est survenue : " + error);
            // throw error;
            return res.status(500).json({ msg: error });
        })
    } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
};

module.exports = {
   deleteUser,
  };
  