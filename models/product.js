const fs = require("fs");
const path = require("path");

const dirName = require("../helpers/path");
const { dir } = require("console");

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const p = path.join(dirName, "data", "products.json");
    fs.readFile(p, (err, contentFile) => {
      let products = [];
      if (!err) {
        products = JSON.parse(contentFile);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    const p = path.join(dirName, "data", "products.json");
    fs.readFile(p, (err, contentFile) => {
      if (err) {
        cb([]);
      }
      cb(JSON.parse(contentFile));
    });
  }
};
