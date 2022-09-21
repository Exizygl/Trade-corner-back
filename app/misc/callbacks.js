
const successCbk = (res, status, data) => {
    res.status(status).json({
        success: true,
        message: data
    });
};

const successCbkProduct = (res, status, number, list) => {
    res.status(status).json({
        success: true,
        number: number,
        list: list
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
    successCbkProduct,
    errorCbk,
};