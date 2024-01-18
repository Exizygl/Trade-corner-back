const router = require("express").Router();
const TransporteurService = require("../services/TransporteurService");
const { hasJWT } = require("../middlewares/jwt");
const successCbk = require("../misc/callbacks").successCbk;
const errorCbk = require("../misc/callbacks").errorCbk;


router.get("/", async (req , res) => {
    try {
      const TransporteurList = await TransporteurService.getAllTransporteur();
      return successCbk(res, 200, { TransporteurList });
    } catch (error) {
  
       return res.status(201).send({ error });
      
    }
  });

  module.exports = router;