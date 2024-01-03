const TransporteurDAO = require("../daos/TransporteurDAO");


const getAllTransporteur = async () => { 
    return await TransporteurDAO.getAllTransporteur();
};


const getTransporteurByName = async (name) => await TransporteurDAO.getByName(name);


module.exports = {

    getAllTransporteur,
    getTransporteurByName
    
  };
  