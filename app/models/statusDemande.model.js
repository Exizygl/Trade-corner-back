const mongoose = require("mongoose");



const statusDemandeSchema = new mongoose.Schema(
  {
    label: {
        type: String,
        lowercase: true,
    },
    userCommandList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "demande",
        required: true,
      },

  },
  {
    timestamps: true,
  }
);


const StatusDemandeModel = mongoose.model("tag", statusDemandeSchema);
module.exports = StatusDemandeModel;
