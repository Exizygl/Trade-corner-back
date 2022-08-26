const mongoose = require("mongoose");

const superCategorySchema = new mongoose.Schema(
  {
    label: {
        type: String,
        required: true,
    },
    categoryIdList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "category",
    },

  },
  {
    timestamps: true,
  }
);


const superCategoryModel = mongoose.model("superCategory", superCategorySchema);
module.exports = superCategoryModel;
