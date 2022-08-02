const mongoose = require("mongoose");



const roleUserSchema = new mongoose.Schema(
  {
    label: {
        type: String,
        lowercase: true,
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


const RoleUserModel = mongoose.model("roleUser", roleUserSchema);
module.exports = RoleUserModel;
