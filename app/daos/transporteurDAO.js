const TransporteurModel = require("../models/Transporteur.model");




const getAllTransporteur = async () => await TransporteurModel.find();

const getByName = async (name) =>
  await TransporteurModel.findOne({ name: new RegExp("^" + name + "$", "i") });

module.exports = {
   
    getAllTransporteur,

};