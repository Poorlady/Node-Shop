const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const errorController = require("./controllers/errors");

const server = express();
const PORT = 8080;

server.set("view engine", "pug");
server.set("views", "views");

server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, "public")));

server.use("/admin", adminRouter);
server.use(shopRouter);

server.use(errorController.get404);

server.listen(PORT, () => console.log("server on"));
