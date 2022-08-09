const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    category: {
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


const CategoryModel = mongoose.model("category", categorySchema);
module.exports = CategoryModel;
