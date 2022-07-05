const UserDAO = require("../daos/userDAO");
const jwt = require("jsonwebtoken");
const emailService = require("./emailService");

const signUp = async (user) => {

    const userExist = await getByEmail(user.email);

    if (userExist) throw "User already exist";

    if (user) emailService.sendEmail(user.email, 'REGISTRATION', user);

    return await UserDAO.signUp(user);
};

const confirmRegistration = async (emailCrypt) => {

    const emailDecrypt = emailService.decryptEmail(emailCrypt);

    const user = await getByEmail(emailDecrypt);

    if (!user) throw "Confirm error - email doesn't belong to any user";

    return await UserDAO.confirmRegistration(user)

};

const getByEmail = async (email) => await UserDAO.getByEmail(email);

// ======= AUTHENTIFICATION ========= //

const signIn = async (email, password, res) => {
    const user = await getByEmail(email);

    if (!user) throw "Authentication error - wrong email";
    if (!user.isValid) throw "Please confirm your email to login - user is not valid";

    const isMatch = await user.comparePassword(password);

    if (!isMatch) throw "Authentication error - wrong password";

    const payload = {
        email: user.email,
        pseudo: user.pseudo,
        id: user._id,
        role: user.role,
    };

    let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 1500,
    });
    res.cookie("jwt", token, { httpOnly: true });

    // Security : hide pwd
    // user.password = "***";

    return { user, id_token: token };
};

module.exports = {
    signUp,
    signIn,
    getByEmail,
    confirmRegistration,
};
