const mongoose = require("mongoose");



const adressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
      maxLength: 5,
    },
    city: {
      type: String,
      required: true,
    },
    userIdList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "user",
      },

  },
  {
    timestamps: true,
  }
);


const AdressModel = mongoose.model("adress", adressSchema);
module.exports = AdressModel;
