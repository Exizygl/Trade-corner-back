const mongoose = require("mongoose");



const tagSchema = new mongoose.Schema(
  {
    tag: {
        type: String,
        lowercase: true,
    },
    productIdList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "product",
        required: true,
      },

  },
  {
    timestamps: true,
  }
);


const TagModel = mongoose.model("tag", tagSchema);
module.exports = TagModel;
