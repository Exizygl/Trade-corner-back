const adminDAO = require("../daos/adminDAO");
const userDAO = require ("../daos/userDAO");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const emailService = require("./emailService");
const userService = require("./userService");
const adressService = require("./adressService");

const getByEmail = async (email) => await userDAO.getByEmail(email);
const getByPseudo = async (pseudo) => await userDAO.getByPseudo(pseudo);



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
        const userToDelete = await adminDAO.getById(req.userToDeleteId);
        emailService.sendEmailAfterDeleteAdmin(userToDelete.email, "DELETE", userToDelete);
        return await adminDAO.deleteUser(req.userToDeleteId);
    }   
};

const updateUser = async (req, res, next) => {
  
  const admin = await adminDAO.getById(req.userId);
    if (!admin) {
        throw "probléme d'identification - administrateur non reconnu"
    }
    
    const userToUpdate = {};
    userToUpdate[req.valueName] = req.valueChange;
    userToUpdate['_id'] = req.userToUpdate;
    
    if (!req.valueChange)
      throw "Update User error - Empty field"

    //Gestion des variables de changement d'adresse
    if (req.valueName == "ville") {
      
        const adress = {
          street :req.adress,
          zipcode : req.zipcode,
          city : req.valueChange
        };
        
      if (req.zipcode.toString().length > 5)
        throw "Update User error - Zipcode too long";
        
        const getuser = await userService.getById(userToUpdate._id);
        const newAdress = await adressService.updateAdress(adress, getuser);
        userToUpdate["adress"] = newAdress._id;
    }

    //Vérification des mot de passes
    if (req.valueName == "password") {
      if (req.valueChange != req.repeatNewPassword)
        throw "Update User error - Not the same password";

      const salt = await bcrypt.genSalt();
      userToUpdate[req.valueName] = await bcrypt.hash(req.valueChange, salt);
    }

     //Vérification email
     if (req.valueName == "email") {
      const userCheck = await getByEmail(req.valueChange);
      if (userCheck) throw "Update User error - Email already taken";

      const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(req.valueChange)) throw "email pas valide";
    }

    //Vérification pseudo
    if (req.valueName == "pseudo") {
      const userCheck = await getByPseudo(req.valueChange);
      if (userCheck) throw "Update User error - Pseudo already taken";
    }

      return await adminDAO.updateUser(userToUpdate);
}

const uploadImageUser = async (filename, userId, userToUpdate,) => {
  const admin = await adminDAO.getById(userId);
    if (!admin) {
        throw "probléme d'identification - administrateur non reconnu"
    }

  const user = await adminDAO.getById(userToUpdate);
  if (filename && (user.imageProfilUrl != filename) && (user.imageProfilUrl != "")) {

      // changing picture
      const oldImagePath = `./public/${user.imageProfilUrl}`
      if (fs.existsSync(oldImagePath)) {
      
        fs.unlinkSync(oldImagePath);
      }
  }

  const newUser = Object.assign(user,
      {
          imageProfilUrl: filename ? filename : user.imageProfilUrl
      })

  return await userDAO.uploadImageUser(newUser)
}

module.exports = {
   deleteUser,
   updateUser,
   uploadImageUser,
  };
  