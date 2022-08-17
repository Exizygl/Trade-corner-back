const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 200
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      //required: true,
    },
    tagIdList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "tag",
      //required: true,
    },
    imageProductUrl: {
      type: [String],
      //required: true,
      
    },
    description: {
      type: String,
      required: true,
      maxLength: 500,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default : 1
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    archive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


const ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;