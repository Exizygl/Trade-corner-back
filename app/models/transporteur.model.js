const mongoose = require("mongoose");



const transporteurSchema = new mongoose.Schema(
  {
    transporteur: {
      type: String,
      lowercase: true,
    },
    imageTransporteur: {
      type: String,
      default: "",
    },
    commandIdList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "command",
      required: true,
    },
     price: {
      type: Number,
      required: true,
    },
    archive: {
      type: Boolean,
      default: false,
    }



  },
  {
    timestamps: true,
  }
);


const TransporteurModel = mongoose.model("transporteur", transporteurSchema);
module.exports = TransporteurModel;
