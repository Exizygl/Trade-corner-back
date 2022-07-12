const adminDAO = require("../daos/adminDAO");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const deleteUser = async (id) => {
    console.log("attention du back : " + JSON.stringify(id));
};

module.exports = {
   deleteUser,
  };
  