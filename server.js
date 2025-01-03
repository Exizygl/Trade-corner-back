const express = require("express");
const serverConfig = require("./app/config/server.config");
const bodyParser = require("body-parser");
const userRoutes = require("./app/routes/user.routes");
const adminRoutes = require("./app/routes/admin.routes");
const productRoutes = require("./app/routes/product.routes");
const categoryRoutes = require("./app/routes/category.routes");
const superCategoryRoutes = require("./app/routes/superCategory.routes");
const roleUserRoutes = require("./app/routes/roleUser.routes");
const transporteurRoutes = require("./app/routes/transporteur.routes")
const commandRoutes = require("./app/routes/command.routes")
const cors = require("cors");
const { hasJWT } = require('./app/middlewares/jwt');
const cookieParser = require("cookie-parser");
// const fileUpload = require("express-fileupload");
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
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use('/static', express.static(__dirname + '/public'));

//Routes
console.log("here");
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/super-category", superCategoryRoutes);
app.use("/api/roleUsers", roleUserRoutes);
app.use("/api/transporteur", transporteurRoutes);
app.use("/api/command", commandRoutes);

app.get("/api", (req, res) => res.status(200).send({ message: "test server" }));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


