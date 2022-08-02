const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

//generateur d'email random
function getRandomString (length) {
  var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var string = '';
  for(var i=0; i<length; i++){
      string += chars[Math.floor(Math.random() * chars.length)];
  }
  return string

}
function getRandomEmail (domain, string) {
  
  return string + domain
}

const getById = async (id) => await UserModel.findOne({ _id: id });

const deleteUser = async (userId) => {

var name = getRandomString(14);
var email = getRandomEmail("@delete.com", name);
  await UserModel.updateOne({ _id: ObjectId(userId) }, {Avatar: "supprimé", 
                                                        pseudo:name, 
                                                        name: name, 
                                                        phoneNumber:"supprimé", 
                                                        adress:"62e8f8c841aace4f4c35fef8", 
                                                        password:"supprimé",
                                                        email: email,
                                                        archive: true,
  });
}

const updateUser = async (userToUpdate) => {
  await UserModel.findOneAndUpdate({ _id: ObjectId(userToUpdate._id) }, userToUpdate, {
    new: true,
  });
  }

module.exports = {
  getById,
  deleteUser,
  updateUser,   
};
  