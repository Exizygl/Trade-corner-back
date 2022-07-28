const mongoose = require("mongoose");



const roleUserSchema = new mongoose.Schema(
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


const RoleUserModel = mongoose.model("tag", roleUserSchema);
module.exports = RoleUserTagModel;
