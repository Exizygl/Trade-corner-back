const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: [true, "Veuillez entrer votre pseudo"],
      minLength: 3,
      maxLength: 56,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 56,
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
      unique: true,
      trim: true,
    },
<<<<<<< HEAD
    role: {
      type: Number,
      default: 0, // 0 = user, 1 = admin
    },
    Avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
    phoneNumber: {
      type: String,
      required: true,
      maxLength: 20,
=======
    phoneNumber: {
      type: String,
      required: true,
      maxLength: 14,
>>>>>>> 088c4e6f7ca786622a57c1686070374c1165eace
    },
    adress: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
<<<<<<< HEAD
      maxLength: 5,
=======
      maxlength: 5,
>>>>>>> 088c4e6f7ca786622a57c1686070374c1165eace
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

<<<<<<< HEAD
// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });
// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.passwordConfirmation = await bcrypt.hash(
//     this.passwordConfirmation,
//     salt
//   );
//   next();
// });
=======
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
>>>>>>> 088c4e6f7ca786622a57c1686070374c1165eace
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
