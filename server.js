const express = require("express");
const serverConfig = require("./app/config/server.config");
const bodyParser = require("body-parser");
const userRoutes = require("./app/routes/user.routes");
const adminRoutes = require("./app/routes/admin.routes");
const productRoutes = require("./app/routes/product.routes");
const categoryRoutes = require("./app/routes/category.routes");
const roleUserRoutes = require("./app/routes/roleUser.routes");
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
// app.use(
//   fileUpload({
//     useTempFiles: true,
//   })
// );
app.use('/static', express.static(__dirname + '/public'));

//Routes

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/product", productRoutes);
<<<<<<< HEAD
app.use("/api/roleUsers", roleUserRoutes);

=======
app.use("/api/category", categoryRoutes);
app.use("/api/roleUsers", roleUserRoutes);
 
>>>>>>> 1aa93d39edc2ae4159ae8225d0eb47f0e8ae4dfc
app.get("/api", (req, res) => res.status(200).send({ message: "test server" }));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


