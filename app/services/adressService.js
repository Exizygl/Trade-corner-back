const AdressDAO = require("../daos/adressDAO");
const { getById } = require("./userService");


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

const getAdressById = async (adress) => {
    
    return await AdressDAO.getAdressById(user.adress._id);
};

const getAdress = async (adress) => {
    console.log(adress)

    return await AdressDAO.getByAdress(adress.street, adress.zipcode, adress.city);
};
const updateAdress = async (adress, userId) => {
    const checkAdress = await getAdress(adress);
    console.log("check" + checkAdress)

    if (checkAdress){ //si adresse déjà dans la base
        console.log("check Adress" + checkAdress.street);
        const checkId = checkAdress.userIdList.filter(data => data = userId);
        console.log(checkid);
        if(checkId) return checkAdress; // si le user a déjà cette adress
        console.log("toyo")
        return await addIdUserToAdress(checkAdress, userId) // si le user avait une adresse différente.

    }

    const newAdress = await signUpAdress(adress); 

    const user = await getById(userId);

    const oldAdress = getAdressById(user.adress._id);

    await deleteAdress(oldAdress, userId);

    
    
    return await AdressDAO.addIdList(newAdress);
};

const deleteAdress = async (oldadress, userId) =>{
    adress = oldadress.userIdList.filter(data => data != userId);
    if (adress.userIdList.lenght == 0) return await AdressDAO.deleteAdress(oldadress);
    return await AdressDAO.adressInfoUpdate(adress);
}


module.exports = {
  signUpAdress,
  addIdUserToAdress,
  updateAdress,
  getAdress,
  deleteAdress
};
