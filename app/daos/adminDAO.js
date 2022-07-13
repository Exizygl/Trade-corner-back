const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

const getById = async (id) => await UserModel.findOne({ _id: id });

const deleteUser = async (userId) =>
  await UserModel.updateOne({ _id: ObjectId(userId) }, {Avatar: "supprimé", 
                                                        pseudo:"supprimé", 
                                                        name: "supprimé", 
                                                        phoneNumber:"supprimé", 
                                                        adress:"supprimé", 
                                                        zipcode:"supprimé", 
                                                        ville:"supprimé", 
                                                        password:"supprimé"
  });

  module.exports = {
    getById,
    deleteUser
    
  };
  