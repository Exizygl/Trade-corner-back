const CommandDAO = require("../daos/commandDAO");



const addCommand = async (command, id) => {
    console.log(command.transporteur)
    console.log(id)
    const addCommand = await CommandDAO.addCommand(command);
    return await CommandDAO.getById(addCommand.id);
};

const getById = async (id) => await CommandDAO.getById(id);


module.exports = {
    addCommand,
    getById,
    
  };
  