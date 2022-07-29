const AdressModel = require("../models/adress.model");
const ObjectId = require("mongoose").Types.ObjectId;


const signUp = async (adress) => await new AdressModel(adress).save();

const addIdList = async (adress) =>
await AdressModel.findOneAndUpdate({ _id: ObjectId(adress._id) }, adress,  {
    new: true,
  });

  const getByAdress = async (street, zipcode, city) =>
  await AdressModel.findOne({ street: new RegExp("^" + street + "$", "i"), zipcode: new RegExp("^" + zipcode + "$", "i"),city: new RegExp("^" + city + "$", "i") });


module.exports = {
    signUp,
    addIdList,
    getByAdress,
  };
  