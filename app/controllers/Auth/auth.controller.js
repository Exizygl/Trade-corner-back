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

  try {
    const user = await UserModel.create({
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
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(400).send({ err });
  }
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
