const CommandDAO = require("../daos/commandDAO");



const addCommand = async (command) => {
    const addCommand = await CommandDAO.addCommand(command);
    return await CommandDAO.getById(command.id);
};

const getById = async (id) => await CommandDAO.getById(id);


module.exports = {
    addCommand,
    getById,
    
  };
  