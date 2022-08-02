const mongoose = require("mongoose");
const { isEmail } = require("validator");

const contactSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail],
        lowercase: true,
        unique: true,
        trim: true,
      },
    message: {
      type: string,
    },
  },
  {
    timestamps: true,
  }
);


const ContactModel = mongoose.model("contact", contactSchema);
module.exports = ContactModel;