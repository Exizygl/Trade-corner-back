const AdressModel = require("../models/adress.model");
const ObjectId = require("mongoose").Types.ObjectId;


const signUp = async (adress) => await new AdressModel(adress).save();
const deleteAdress = async (adress) => await AdressModel.deleteOne({ _id: ObjectId(adress._id) });

const addIdList = async (adress) =>
await AdressModel.findOneAndUpdate({ _id: ObjectId(adress._id) }, adress,  {
  new: true,
});


  const getByAdress = async (street, zipcode, city) =>
  await AdressModel.findOne({ street: new RegExp("^" + street + "$", "i"), zipcode: new RegExp("^" + zipcode + "$", "i"),city: new RegExp("^" + city + "$", "i") });


  const getAdressById = async (id) => await AdressModel.findOne({ _id: id });

  const adressInfoUpdate = async (adress) =>
  await AdressModel.findOneAndUpdate({ _id: ObjectId(adress._id) }, adress, {
    new: true,
  });

module.exports = {
    signUp,
    addIdList,
    getByAdress,
    getAdressById,
    deleteAdress,
    adressInfoUpdate,
};
