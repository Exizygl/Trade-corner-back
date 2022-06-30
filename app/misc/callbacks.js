
const successCbk = (res, status, data) => {
    res.status(status).json({
        success: true,
        message: data
    });
};

const errorCbk = (res, status, data) => {
    res.status(status).json({
        success: false,
        message: data.message
    });
};


module.exports = {
    successCbk,
    errorCbk
};