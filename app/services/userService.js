const UserDAO = require("../daos/userDAO");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailService = require("./emailService");
const UserModel = require("../models/user.model");

const signUp = async (user) => {
  //   if (!emailService.validateEmail(user.email)) throw "Email invalide";

  const activation_token = emailService.createActivationToken(user);

  const url = `${process.env.CLIENT_URL}/user/activate/${activation_token}`;

  emailService.sendEmail(user.email, url, "Vérifiez votre adresse email");

  const newUser = await UserModel.create({
    pseudo,
    name,
    email,
    phoneNumber,
    adress,
    zipcode,
    ville,
    password,
  });
  res.status(201).json({
    msg: "Votre compte a été enregistrer ! Veuillez activé votre adresse mail s'il vous plaît pour commencer.",
  });

  //   const userDB = await getByEmail(user.email);

  //   if (!userDB) throw "User not found";

  return await UserDAO.signUp(user);
};

const getByEmail = async (email) => await UserDAO.getByEmail(email);

const getById = async (id) => await UserDAO.getById(id);

// ======= AUTHENTIFICATION ========= //

const signIn = async (email, password, res) => {
  const user = await getByEmail(email);

  if (!user) throw "Authentication error - wrong email";
  // if (!user.isValid) throw "Please confirm your email to login - user is not valid";

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
  try {
    const user = {};
    user[userInfo.valueName] = userInfo.valueChange;
    user["_id"] = userId;

    if (!userInfo.valueChange)
      return res.status(400).json({ msg: "Veuillez remplir tous les champs." });

    user[userInfo.valueName] = userInfo.valueChange;

    if (userInfo.valueName == "password") {
      if (!userInfo.oldPassword || !userInfo.repeatNewPassword)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir tous les champs." });

      if (userInfo.valueChange != userInfo.repeatNewPassword)
        throw "Mot de passe différent";

      userCheck = await getById(userId);
      console.log(userCheck);
      const isMatch = await userCheck.comparePassword(userInfo.oldPassword);
      if (!isMatch) throw "Mot de passe incorrect";

      const salt = await bcrypt.genSalt();
      user[userInfo.valueName] = await bcrypt.hash(userInfo.valueChange, salt);
    }
    if (userInfo.valueName == "email") {
      const userCheck = await getByEmail(userInfo.valueChange);
      if (userCheck) throw "Cette email est déjà pris";

      const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(email)) throw "email pas valide";
    }

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
};
