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

      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      sendMail(email, url, "Vérifiez votre adresse email");

      res.status(201).json({
        msg: "Votre compte a été enregistrer ! Veuillez activé votre adresse mail s'il vous plaît pour commencer.",
      });
    } catch (err) {
      console.log(err);
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
      res.status(201).json({ newUser: newUser._id });

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

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const createActivationToken = (payload) => {
  return jwt.sign({ payload }, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign({ payload }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign({ payload }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
