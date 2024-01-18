const CommandModel = require("../models/command.model");
const ObjectId = require("mongoose").Types.ObjectId;

const addCommand = async (command) => await new CommandModel(command).save();


const getById = async (command) =>
    await CommandModel.findOne({ id: new RegExp("^" + command.id + "$", "i") });



module.exports = {
    addCommand,
    getById,
};
