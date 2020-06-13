const express = require("express");

const productController = require("../controllers/products");

const route = express.Router();

route.get("/", productController.getProducts);

module.exports = route;
