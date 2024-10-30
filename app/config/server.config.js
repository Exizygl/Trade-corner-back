const mongoose = require("mongoose");
require("dotenv").config();

module.exports = {
  PORT: process.env.SERVER_PORT,
};

mongoose.connect(
  "mongodb+srv://" +
    process.env.DB_USER_PASS +
    "@cluster0.u0yygyt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (!err) console.log("Mongodb connected");
    else console.log("Connection error :" + err);
  }
);
