const mongoose = require("mongoose");



const statusDemandeSchema = new mongoose.Schema(
  {
    label: {
        type: String,
        lowercase: true,
    },
    

  },
  {
    timestamps: true,
  }
);


const StatusDemandeModel = mongoose.model("statusDemande", statusDemandeSchema);
module.exports = StatusDemandeModel;
