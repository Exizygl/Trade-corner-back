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

const getAdressById = async (id) => {
    
    return await AdressDAO.getAdressById(id);
};

const getAdress = async (adress) => {
      return await AdressDAO.getByAdress(adress.street, adress.zipcode, adress.city);
};
const updateAdress = async (adress, user) => {
    const checkAdress = await getAdress(adress);
    const oldAdress = await getAdressById(user.adress._id);
    

    if (checkAdress){ //si adresse déjà dans la base
        
        const idList = checkAdress.userIdList;
        const checkId = idList.filter(data => data.equals(user._id));
        
        if(checkId.lenght > 0) return checkAdress; // si le user a déjà cette adress
        

        await deleteAdress(oldAdress, user._id);

        return await addIdUserToAdress(checkAdress, user._id) // si le user avait une adresse différente.

    }

    const newAdress = await signUpAdress(adress); 

    await deleteAdress(oldAdress, user._id);

    
    return await addIdUserToAdress(newAdress, user);
};

const deleteAdress = async (adress, userId) =>{
   
    changeAdress = adress
    changeAdress.userIdlist = adress.userIdList.pull(userId);
   
    if (!changeAdress.userIdList[0]) return await AdressDAO.deleteAdress(adress);
    return await AdressDAO.adressInfoUpdate(changeAdress);
}


module.exports = {
  signUpAdress,
  addIdUserToAdress,
  updateAdress,
  getAdress,
  deleteAdress,
  getAdressById,
};
