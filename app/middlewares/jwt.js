const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
const errorCbk = require('../misc/callbacks').errorCbk;

const hasJWT = (req, res, next) => {
    const jwtToken = req.headers.authorization.split(" ")[1];

    if (jwtToken) {
        jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                return errorCbk(res, 401, err)
            } else {
                let user = await UserModel.findById(decodedToken.id);
                req.userId = user._id;
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
    }
}



module.exports = {
    hasJWT
};