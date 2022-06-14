const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 56,
      unique: true,
      trimp: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    surName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      maxLength: 14,
    },
    adress: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
      maxlength: 5,
    },
    ville: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minLength: 6,
    },
    passwordConfirmation: {
      type: String,
      required: true,
      max: 1024,
      minLength: 6,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.passwordConfirmation = await bcrypt.hash(
    this.passwordConfirmation,
    salt
  );
  next();
});
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
