const router = require('express').Router();
const CommandService = require('../services/commandService');
const { hasJWT } = require('../middlewares/jwt');

const successCbk = require("../misc/callbacks").successCbk;
const errorCbk = require("../misc/callbacks").errorCbk;
const uploadProductPhotos = require("../middlewares/uploadProductPhotos");
const upload = require("../middlewares/upload");


router.post('/add', hasJWT, uploadProductPhotos, async (req, res) => {


    try {
        console.log(req.body)
        
        const command = await CommandService.addCommand(req.body, req.userId);


        return successCbk(res, 200, { command });
    } catch (error) {

        return res.status(201).send(error);
    }
});


module.exports = router;
