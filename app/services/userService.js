const UserDAO = require("../daos/userDAO");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailService = require("./emailService");

const signUp = async (user) => {
  const userExist = await getByEmail(user.email);

  if (userExist) throw "User already exist";

  if (user) emailService.sendEmail(user.email, "REGISTRATION", user);

  return await UserDAO.signUp(user);
};

const confirmRegistration = async (emailCrypt) => {
  const emailDecrypt = emailService.decryptEmail(emailCrypt);

  const user = await getByEmail(emailDecrypt);

  if (!user) throw "Confirm error - email doesn't belong to any user";

  return await UserDAO.confirmRegistration(user);
};

const getByEmail = async (email) => await UserDAO.getByEmail(email);

const getByPseudo = async (email) => await UserDAO.getByPseudo(pseudo);

const getById = async (id) => await UserDAO.getById(id);

// ======= AUTHENTIFICATION ========= //

const signIn = async (email, password, res) => {
  const user = await getByEmail(email);

  if (!user) throw "Authentication error - wrong email";
  if (!user.isValid)
    throw "Please confirm your email to login - user is not valid";

  const isMatch = await user.comparePassword(password);

  if (!isMatch) throw "Authentication error - wrong password";

  const payload = {
    email: user.email,
    pseudo: user.pseudo,
    id: user._id,
    role: user.role,
  };

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

const userInfoUpdate = async (userInfo, userId) => {
  
    const user = {};
    user[userInfo.valueName] = userInfo.valueChange;

    user['_id'] = userId;
    if (!userInfo.valueChange)
      throw "Update User error - Empty field"

    user[userInfo.valueName] = userInfo.valueChange;


    if (userInfo.valueName == "ville") {
      user['adress'] = userInfo.adress;
      user['zipcode'] = userInfo.zipcode;

      if (user['zipcode'].lenght > 5)
        throw "Update User error - Zipcode too long"
      
    }

    if (userInfo.valueName == "password") {
      if (!userInfo.oldPassword || !userInfo.repeatNewPassword)
        throw "Update User error - Empty field"

      if (userInfo.valueChange != userInfo.repeatNewPassword)
        throw "Update User error - Not the same password";

      userCheck = await getById(userId);
      console.log(userCheck);
      const isMatch = await userCheck.comparePassword(userInfo.oldPassword);
      if (!isMatch) throw "Update User error - Error old password";

      const salt = await bcrypt.genSalt();
      user[userInfo.valueName] = await bcrypt.hash(userInfo.valueChange, salt);
    }
    if (userInfo.valueName == "email") {
      const userCheck = await getByEmail(userInfo.valueChange);
      if (userCheck) throw "Update User error - Email already taken";



      const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(userInfo.valueChange)) throw "email pas valide";
    }

      if (userInfo.valueName == "pseudo") {
      const userCheck = await getByEmail(userInfo.valueChange);
      if (userCheck) throw "Update User error - Pseudo already taken";
      }

      console.log(user);
      return await UserDAO.userInfoUpdate(user);
    
  };

  const userSoftDelete = async (userInfo, userId) => {
    try {

      const user = {};




      if (!userInfo.password)
        return res.status(400).json({ msg: "Veuillez remplir tous les champs." });




      userCheck = await getById(userId);

      const isMatch = await userCheck.comparePassword(userInfo.password);
      if (!isMatch) throw "Mot de passe incorrect";

      var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
      var string = '';
      for (var ii = 0; ii < 15; ii++) {
        string += chars[Math.floor(Math.random() * chars.length)];
      }
      user['_id'] = userId;
      user['pseudo'] = string;
      user['name'] = string;
      user['email'] = string + '@delete.com';
      user['Avatar'] = 'del';
      user['phoneNumber'] = 'del';
      user['adress'] = 'del';
      user['zipcode'] = 'del';
      user['ville'] = 'del';
      user['password'] = 'delete';
      user['isValid'] = false;
      user['archive'] = true;



      return await UserDAO.userInfoUpdate(user);

    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  };
  module.exports = {
    signUp,
    signIn,
    getByEmail,
    getById,
    userInfoUpdate,
    logout,
    confirmRegistration,
    userSoftDelete
  };
