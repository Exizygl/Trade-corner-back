const UserModel = require("../../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password").populate('role', 'label').populate('adress', ['street', 'zipcode', 'city']);
  return res.status(200).send(users);
};

module.exports.userInfo = (req, res) => {
  console.log(req.params);
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password").populate('role', 'label').populate('adress', ['street', 'zipcode', 'city']);

};



