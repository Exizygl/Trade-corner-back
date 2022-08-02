const mongoose = require("mongoose");



const transporteurOptionSchema = new mongoose.Schema(
  {
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    transporteurId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transporteur",
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


const TransporteurOptionModel = mongoose.model("transporteurOption", transporteurOptionSchema);
module.exports = TransporteurOptionModel;
