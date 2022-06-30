
const UserDAO = require('../daos/userDAO');
const jwt = require('jsonwebtoken');


const signUp = async (user) => await UserDAO.signUp(user);

const getByEmail = async (email) => await UserDAO.getByEmail(email);


// ======= AUTHENTIFICATION ========= //

const signIn = async (email, password, res) => {

    const user = await getByEmail(email);

    if (!user) throw "Authentication error - wrong email";
    // if (!user.isValid) throw "Please confirm your email to login - user is not valid";

    const isMatch = await user.comparePassword(password);

    if (!isMatch) throw "Authentication error - wrong password";

    const payload = {
        email: user.email,
        pseudo: user.pseudo,
        id: user._id,
        role: user.role
    };

    let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1500 });
    res.cookie('jwt', token, { httpOnly: true });

    // Security : hide pwd
    // user.password = "***";

    return { user, id_token: token };
};


module.exports = {
    signUp,
    signIn,
    getByEmail
}