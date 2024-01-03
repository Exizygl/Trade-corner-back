const CommandDAO = require("../daos/commandDAO");
const { archiveProduct, getProductById } = require("./productService");
const { getTransporteurByName } = require("./transporteurService");



const addCommand = async (command, id) => {
    
    console.log("a")

    const transporteur = await getTransporteurByName(command.transporteur)

  
    console.log("b")

    const newCommand = {}
    
    newCommand['buyerId'] = id
    newCommand['productIdList'] = command.ids
    newCommand['status'] = "waiting"
    newCommand['transporteurId'] = transporteur._id
    console.log(newCommand)
    const addCommand = await CommandDAO.addCommand(newCommand);
    console.log("d")

    if(addCommand){
    addCommand.productIdList.forEach(id => {
        archiveProduct(id)
    });
    
    return await CommandDAO.getById(addCommand._id);
    }
};

const getById = async (id) => await CommandDAO.getById(id);


module.exports = {
    addCommand,
    getById,
    
  };
  