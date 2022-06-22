const UserModel = require("../../models/user.model");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: 3 * 24 * 60 * 60 * 1000,
  });
};

module.exports.signUp = async (req, res) => {
  console.log("signUp");
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
      passwordConfirmation,
      cgu,
    } = req.body;

    if (
      !pseudo ||
      !name ||
      !phoneNumber ||
      !adress ||
      !zipcode ||
      !ville ||
      !email ||
      !password ||
      !passwordConfirmation ||
      !cgu
    )
      return res.status(400).json({ msg: "Merci de remplir tous les champs." });

    if (!validateEmail(email))
      return res.status(400).json({ msg: "Invalid email." });

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ msg: "Cette email existe déjà !" });

    res.json({ msg: "Création de compte réussi !" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

module.exports.signIn = async (req, res) => {
  console.log("signIn");
  const { email, password } = req.body;

  try {
    const user = await UserModel.create(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    res.status(400).json(err);
  }
};
