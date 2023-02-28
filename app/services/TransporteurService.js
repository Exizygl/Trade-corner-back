const TransporteurDAO = require("../daos/TransporteurDAO");


const getAllTransporteur = async () => { 
    return await TransporteurDAO.getAllTransporteur();
};
  


module.exports = {

    getAllTransporteur,
    
    
  };
  