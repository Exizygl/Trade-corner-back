const mongoose = require("mongoose");



const statusCommandSchema = new mongoose.Schema(
  {
    label: {
        type: String,
        lowercase: true,
    },
    userCommandList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "command",
        required: true,
      },

  },
  {
    timestamps: true,
  }
);


const StatusCommandModel = mongoose.model("command", statusCommandSchema);
module.exports = StatusCommandModel;
