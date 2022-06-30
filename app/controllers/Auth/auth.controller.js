const UserModel = require("../../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendMail = require("./sendMail");

const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const client = new OAuth2(process.env.MAILING_SERVICE_SERVICE_ID);
const { CLIENT_URL } = process.env;

const userCtrl = {
  register: async (req, res) => {
    try {
      const {
        pseudo,
        name,
        email,
        phoneNumber,
        adress,
        zipcode,
        ville,
        password,
      } = req.body;

      if (
        !pseudo ||
        !name ||
        !email ||
        !phoneNumber ||
        !adress ||
        !zipcode ||
        !ville ||
        !password
      )
        return res
          .status(400)
          .json({ msg: "Veuillez remplir tous les champs." });

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid emails." });

      const mail = await UserModel.findOne({ email });
      if (mail)
        return res.status(400).json({ msg: "Cette adresse mail existe déjà." });

      if (password.length < 6)
        return res.status(400).json({
          msg: "Le mot de passe doit comporter au moins 6 caractères.",
        });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = await UserModel.create({
        pseudo,
        name,
        email,
        phoneNumber,
        adress,
        zipcode,
        ville,
        password: passwordHash,
      });
      res.status(201).json({ user: user._id });

      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}/mail/activate/${activation_token}`;
      sendMail(email, url, "Vérifiez votre adresse email");

      res.json({
        msg: "Votre compte a été enregistrer ! Veuillez activé votre adresse mail s'il vous plaît pour commencer.",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const {
        pseudo,
        name,
        email,
        phoneNumber,
        adress,
        zipcode,
        ville,
        password,
      } = user;

      const check = await UserModel.findOne({ email });
      if (check)
        return res.status(400).json({ msg: "Cette adresse mail existe déjà." });

      const newUser = new UserModel({
        pseudo,
        name,
        email,
        phoneNumber,
        adress,
        zipcode,
        ville,
        password,
      });

      await newUser.save();

      res.json({ msg: "Votre compte est activé !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "Cette adresse mail n'existe pas." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Mot de passe incorrect" });

      const refresh_token = createRefreshToken({ id: user.id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
      });

      res.json({ msg: "Login success !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;

// module.exports.signIn = async (req, res) => {
//   console.log("signIn");
//   const { email, password } = req.body;

//   try {
//     const user = await UserModel.login(email, password);
//     const token = createToken(user._id);
//     res.cookie("jwt", token, { httpOnly: true, maxAge });
//     res.status(200).json({ user: user._id });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// };

// const maxAge = 3 * 24 * 60 * 60 * 1000;
// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.TOKEN_SECRET, {
//     expiresIn: 3 * 24 * 60 * 60 * 1000,
//   });
// };

// module.exports.signUp = async (req, res) => {
//   console.log(req.body);
//   const {
//     pseudo,
//     name,
//     email,
//     phoneNumber,
//     adress,
//     zipcode,
//     ville,
//     password,
//     passwordConfirmation,
//   } = req.body;

//   try {
//     const user = await UserModel.create({
//       pseudo,
//       name,
//       email,
//       phoneNumber,
//       adress,
//       zipcode,
//       ville,
//       password,
//       passwordConfirmation,
//     });
//     res.status(201).json({ user: user._id });
//   } catch (err) {
//     console.log(err);
//     res.status(400).send({ err });
//   }
// };

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
