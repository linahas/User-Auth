const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// import routes.
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");

const server = express();

//Partie connection Database 
server.use(bodyParser.json());
server.use(cors());
mongoose.connect(process.env.DB_CONNECT);
mongoose.connection.on("connected", () => {
    console.log("DB_CONNECTED")
})
mongoose.connection.on("error", (err) => {
    console.log("error: " + err)
})

server.use("/api/users", userRoutes);
server.use("/api/products", productRoutes);
server.use("/api/categories", categoryRoutes);

server.listen(process.env.APP_PORT, () => {
    console.log(`server listning on port ${process.env.APP_PORT}`);

})




