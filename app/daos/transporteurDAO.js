const TransporteurModel = require("../models/transporteur.model");




const getAllTransporteur = async () => await TransporteurModel.find();

const getByName = async (name) =>
  await TransporteurModel.findOne({ transporteur: new RegExp("^" + name + "$", "i") });

module.exports = {
   
    getAllTransporteur,
    getByName

};