const TransporteurModel = require("../models/Transporteur.model");
const ObjectId = require("mongoose").Types.ObjectId;



const getAllTransporteur = async () => await TransporteurModel.find();



module.exports = {
   
    getAllTransporteur,

};