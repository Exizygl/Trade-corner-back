const mongoose = require("mongoose");



const transporteurSchema = new mongoose.Schema(
  {
    transporteur: {
        type: String,
        lowercase: true,
    },
    commandIdList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "command",
        required: true,
    },
    transporteurOptionId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "transporteurOption",
        required: true,
    },
    

  },
  {
    timestamps: true,
  }
);


const TransporteurModel = mongoose.model("transporteur", transporteurSchema);
module.exports = TransporteurModel;
