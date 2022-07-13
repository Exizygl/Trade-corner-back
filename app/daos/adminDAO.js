const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

//generateur d'email random
function getRandomEmail (domain, length) {
  var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var string = '';
  for(var i=0; i<length; i++){
      string += chars[Math.floor(Math.random() * chars.length)];
  }
  return string + domain
}

const getById = async (id) => await UserModel.findOne({ _id: id });

const deleteUser = async (userId) => {

var email = getRandomEmail("@delete.com", 14);
  await UserModel.updateOne({ _id: ObjectId(userId) }, {Avatar: "supprimé", 
                                                        pseudo:"supprimé", 
                                                        name: "supprimé", 
                                                        phoneNumber:"supprimé", 
                                                        adress:"supprimé", 
                                                        zipcode:"supprimé", 
                                                        ville:"supprimé", 
                                                        password:"supprimé",
                                                        email: email,
  });
}

  module.exports = {
    getById,
    deleteUser
    
  };
  