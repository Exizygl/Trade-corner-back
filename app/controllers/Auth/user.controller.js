const UserModel = require("../../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  return res.status(200).send(users);
};

module.exports.userInfo = (req, res) => {
  console.log(req.params);
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");

};


module.exports.userInfoUpdate = (req, res) => {
    try {
      const {
        valueName,
        valueChange
      } = req.body

      if (!valueChange)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir tous les champs." });

      if (valueName == "password") {

        const {
          oldPassword,
          repeatNewPassword
        } = req.body

        if (
          !oldPassword ||
          !repeatNewPassword
        )

          return res
            .status(400)
            .json({ msg: "Veuillez remplir tous les champs." });


      }

      if (valueName == "adress") {

        const {
          zipcode,
          ville
        } = req.body

        if (
          !zipcode ||
          !ville
        )
          return res
            .status(400)
            .json({ msg: "Veuillez remplir tous les champs." });
      }




      if (valueName == "password") {
        const user = UserModel.findById(req.params.id);

        if (valueChange != repeatNewPassword)
        return res.status(400).json({ msg: "Mot de passe différent" });

        const isMatch = bcrypt.compare(valueChange, user.password);
        if (!isMatch)
          return res.status(400).json({ msg: "Mot de passe incorrect" });

        UserModel.findByIdAndUpdate(req.params.id, { valueName: valueChange })
      }


      if (valueName == "adress") UserModel.findByIdAndUpdate(req.params.id, { valueName: valueChange, zipcode: zipcode, ville: ville });
      if (valueName != "adress" && valueName != "password") UserModel.findByIdAndUpdate(req.params.id, { valueName: valueChange })




    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });

    }
  }

