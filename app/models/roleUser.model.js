const mongoose = require("mongoose");



const roleUserSchema = new mongoose.Schema(
  {
    label: {
        type: String,
        lowercase: true,
    },
    userIdList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "user",
        required: true,
      },

  },
  {
    timestamps: true,
  }
);


const RoleUserModel = mongoose.model("tag", roleUserSchema);
module.exports = RoleUserModel;
