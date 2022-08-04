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
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roleUser",
    },
    imageProfilUrl: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      required: true,
      maxLength: 20,
    },
    adress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adress",
      required: true,
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    productIdList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "product",

    },
    commandIdList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "command",
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
    archive: {
      type: Boolean,
      default: false,
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

// ======= Pour la connexion ========== //
userSchema.methods.comparePassword = async function (candidatePassword, cb) {
  return await new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) reject(err);

      resolve(isMatch);
    });
  });
};

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
