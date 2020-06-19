const fs = require("fs");
const path = require("path");

const dirName = require("../helpers/path");
const Cart = require("../models/cart");

const p = path.join(dirName, "data", "products.json");

const readFile = (cb) => {
  fs.readFile(p, (err, contentFile) => {
    if (err) {
      cb([]);
    }
    cb(JSON.parse(contentFile));
  });
};

module.exports = class Product {
  constructor(product) {
    this.id = product.id;
    this.title = product.title;
    this.imageUrl = product.imageUrl;
    this.price = product.price;
    this.description = product.description;
  }

  save() {
    readFile((products) => {
      if (this.id) {
        const productIndex = products.findIndex((item) => item.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[productIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    readFile(cb);
  }

  static findById(id, cb) {
    readFile((products) => {
      const item = products.find((product) => product.id == id);
      cb(item);
    });
  }

  static delete(id) {
    readFile((products) => {
      const product = products.find((item) => item.id === id);
      const updatedProducts = products.filter((item) => item.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        } else {
          console.log(err);
        }
      });
    });
  }
};
