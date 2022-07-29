const AdressDAO = require("../daos/adressDAO");


// ======= INSCRIPTION ========= //

const signUpAdress = async (adress) => {

    const adressExist = await AdressDAO.getByAdress(adress.street, adress.zipcode, adress.city);
    if (adressExist) return adressExist;

    return await AdressDAO.signUp(adress);
};

const addIdUserToAdress = async (adress, user) => {
    adress.userIdList.push(user._id);
    
    return await AdressDAO.addIdList(adress);
};



module.exports = {
  signUpAdress,
  addIdUserToAdress,
};
