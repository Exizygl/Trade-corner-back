const express = require("express");
const serverConfig = require("./app/config/server.config");
const bodyParser = require("body-parser");
const userRoutes = require("./app/routes/user.routes");
const boutiqueRoutes = require("./app/routes/boutique.routes")
require("./app/config/server.config");

const PORT = serverConfig.PORT || 5000;

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use("/api/auth", userRoutes);

app.get("/api", (req, res) => res.status(200).send({ message: "test server" }));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
