const TransporteurModel = require("../models/Transporteur.model");




const getAllTransporteur = async () => await TransporteurModel.find();



module.exports = {
   
    getAllTransporteur,

};