const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    label: {
        type: String,
        required: true,
    },
    productIdList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "product",
    },
    superCategorieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "superCategory",
    },

  },
  {
    timestamps: true,
  }
);


const CategoryModel = mongoose.model("category", categorySchema);
module.exports = CategoryModel;
