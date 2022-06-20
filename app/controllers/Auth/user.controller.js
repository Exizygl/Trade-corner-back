const UserModel = require("../../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
};

module.exports.userInfo = (req, res) => {
  console.log(req.params);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findbyId(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};
