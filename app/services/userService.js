const UserDAO = require("../daos/userDAO");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const emailService = require("./emailService");
const { signUpAdress, addIdUserToAdress, updateAdress } = require("./adressService");
const { addRole } = require("../daos/roleUserDAO");
const { getByLabel, addIdUserToRole } = require("./roleUserService");


// ======= INSCRIPTION ========= //

const signUp = async (user) => {
  const userExist = await getByEmail(user.email);

  if (userExist) throw "User already exist";

  console.log(user);

  
  
  
  if (user)
    emailService.sendEmailForConfirmation(user.email, "REGISTRATION", user);

    const newAdress = {
      street : user.adress,
      zipcode : user.zipcode,
      city : user.ville
    }
  
    const adress = await signUpAdress(newAdress);

    const role = await getByLabel("user");

    

    const userInfo = {
      pseudo: user.pseudo,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role:  role._id,
      adress: adress._id,
      password: user.password,
      passwordConfirmation: user.passwordConfirmation
    }

  const newUser = await UserDAO.signUp(userInfo);



  await addIdUserToAdress(adress, newUser)
 
  await addIdUserToRole(role, newUser);


  return newUser;

};

const confirmRegistration = async (emailCrypt) => {
  const emailDecrypt = emailService.decryptEmail(emailCrypt);

  const user = await getByEmail(emailDecrypt);

  if (!user) throw "Confirm error - email doesn't belong to any user";

  return await UserDAO.confirmRegistration(user);
};

// ======= RECHERCHE ========= //

const getByEmail = async (email) => await UserDAO.getByEmail(email);

const getByPseudo = async (pseudo) => await UserDAO.getByPseudo(pseudo);

const getById = async (id) => await UserDAO.getById(id);

// ======= AUTHENTIFICATION ========= //

const signIn = async (email, password, res) => {
  const user = await getByEmail(email);

  if (!user) throw "Authentication error - wrong email";
  if (!user.isValid)
    throw "Please confirm your email to login - user is not valid";

    
    console.log(user);

  const isMatch = await user.comparePassword(password);

  if (!isMatch) throw "Authentication error - wrong password";



  const payload = {
    email: user.email,
    pseudo: user.pseudo,
    id: user._id,
    role: user.role.label,
  };
  console.log(payload);
  let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 1500,
  });
  res.cookie("jwt", token, { httpOnly: true });

  // Security : hide pwd
  // user.password = "***";

  return { user, id_token: token };
};

// ======= LOGOUT ========= //

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
    return res.json({ msg: "Logged out." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// ======= MODIFICATIONS ========= //

const userInfoUpdate = async (userInfo, userId) => {
  const user = {};
  user[userInfo.valueName] = userInfo.valueChange;
  user["_id"] = userId;
  if (!userInfo.valueChange) throw "Update User error - Empty field";

  user[userInfo.valueName] = userInfo.valueChange;

  //Gestion des variables de changement d'adresse
  if (userInfo.valueName == "ville") {
    const adress = {
      street : userInfo.adress,
      zipcode : userInfo.zipcode,
      city : userInfo.valueChange
    }
    

    console.log(userInfo.zipcode.toString().length);
    if (userInfo.zipcode.toString().length > 5)
      throw "Update User error - Zipcode too long";

    if (/\d/.test(userInfo.valueChange)) {
      throw "Update User error - City has number";
    }

    const newAdress = await updateAdress(adress, userId);
    console.log("result " + newAdress);


    user[userInfo.valueName] = newAdress._id;

  }
  //Vérification des mot de passes
  if (userInfo.valueName == "password") {
    if (!userInfo.oldPassword || !userInfo.repeatNewPassword)
      throw "Update User error - Empty field";

    if (userInfo.valueChange != userInfo.repeatNewPassword)
      throw "Update User error - Not the same password";

    if (userInfo.valueChange.toString().length < 6)
      throw "Update User error - Password too short";

    userCheck = await getById(userId);

    const isMatch = await userCheck.comparePassword(userInfo.oldPassword);
    if (!isMatch) throw "Update User error - Error old password";

    const salt = await bcrypt.genSalt();
    user[userInfo.valueName] = await bcrypt.hash(userInfo.valueChange, salt);
  }
  if (userInfo.valueName == "email") {
    const userCheck = await getByEmail(userInfo.valueChange);
    if (userCheck) throw "Update User error - Email already taken";

    //Vérification email
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(userInfo.valueChange)) throw "email pas valide";
  }

  //Vérification pseudo
  if (userInfo.valueName == "pseudo") {
    console.log("version bastien = " + JSON.stringify(user));
    const userCheck = await getByPseudo(userInfo.valueChange);
    if (userCheck) throw "Update User error - Pseudo already taken";
  }

  return await UserDAO.userInfoUpdate(user);
};

const uploadImageUser = async (filename, userId) => {
  const user = await getById(userId);

  if (
    filename &&
    user.imageProfilUrl != filename &&
    user.imageProfilUrl != ""
  ) {
    // changing picture
    const oldImagePath = `./public/${user.imageProfilUrl}`;
    if (fs.existsSync(oldImagePath)) {
      
      fs.unlinkSync(oldImagePath);
    }
    
  }

  const newUser = Object.assign(user, {
    imageProfilUrl: filename ? filename : user.imageProfilUrl,
  });

  return await UserDAO.uploadImageUser(newUser);
};

const userSoftDelete = async (userInfo, userId) => {
  const user = {};

  userCheck = await getById(userId); //Get User

  //Vérification Mot de passe
  const isMatch = await userCheck.comparePassword(userInfo.password);
  if (!isMatch) throw "Delete User error - Mot de passe incorrect";

  //Création d'une random string pour remplir la BDD
  var chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  var string = "";
  for (var ii = 0; ii < 15; ii++) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }
  user["_id"] = userId;
  user["pseudo"] = string;
  user["name"] = string;
  user["email"] = string + "@delete.com";
  user["Avatar"] = "del";
  user["phoneNumber"] = "del";
  user["adress"] = "del";
  user["zipcode"] = "del";
  user["ville"] = "del";
  user["password"] = "delete";
  user["isValid"] = false;
  user["archive"] = true;

  return await UserDAO.userInfoUpdate(user);
};

const userForgottenPassword = async (userInfo) => {
  const user = await getByEmail(userInfo.email); //Get User

  if (!user) throw "Authentication error - wrong email";

  if (user)
    emailService.sendEmailForPasswordRecovery(
      user.email,
      "FORGOTTENPASSWORD",
      user
    );

  return await UserDAO.userInfoUpdate(user);
};

const userPasswordChange = async (userInfo) => {
  const emailDecrypt = emailService.decryptEmail(userInfo.email);

  const user = await getByEmail(emailDecrypt);

  if (!user) throw "Password Change error - wrong email";

  if (userInfo.password != userInfo.passwordRepeat)
    throw "Password Change error - Not the same password";

  if (userInfo.password.toString().length < 6)
    throw "Password Change error - Password too short";

  const salt = await bcrypt.genSalt();

  user.password = await bcrypt.hash(userInfo.password, salt);

  return await UserDAO.userInfoUpdate(user);
};

module.exports = {
  signUp,
  signIn,
  getByEmail,
  getByPseudo,
  getById,
  userInfoUpdate,
  logout,
  confirmRegistration,
  userSoftDelete,
  uploadImageUser,
  userForgottenPassword,
  userPasswordChange,
};
