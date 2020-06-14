const fs = require("fs");
const path = require("path");

const dirName = require("../helpers/path");

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
    this.title = product.title;
    this.imageUrl = product.imageUrl;
    this.price = product.price;
    this.description = product.description;
  }

  save() {
    this.id = Math.random().toString();
    readFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
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
};
