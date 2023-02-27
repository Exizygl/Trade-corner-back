const TransporteurDAO = require("../daos/TransporteurDAO");


const getAllTransporteur = async () => { 
    return await CategoryDAO.getAllTransporteur();
};
  


module.exports = {

    getAllTransporteur,
    
    
  };
  