const fs = require("fs");
const path = require("path");

const dirName = require("../helpers/path");

const p = path.join(dirName, "data", "carts.json");

module.exports = class Cart {
  static addProduct(id, price) {
    fs.readFile(p, (err, contentData) => {
      //read the file
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(contentData);
      }
      //analyze the file
      //find the productIndex
      const productIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const updatedProducts = [...cart.products];
      //if exist
      if (productIndex >= 0) {
        //change the product qty
        let newQuantity = updatedProducts[productIndex].quantity + 1;
        updatedProducts[productIndex].quantity = newQuantity;
      } else {
        //make new product
        const product = { id: id, quantity: 1 };
        updatedProducts.push(product);
      }
      //set the new cart data
      cart.totalPrice = cart.totalPrice + +price;
      cart.products = updatedProducts;

      //write the cart to file
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, price) {
    fs.readFile(p, (err, contentData) => {
      if (err) {
        return;
      }
      const cart = { ...JSON.parse(contentData) };
      const productIndex = cart.products.findIndex((item) => item.id === id);
      if (productIndex < 0) {
        return;
      }
      const productQty = cart.products[productIndex].quantity;
      const updatedProducts = cart.products.filter((item) => item.id !== id);
      const updatedTotalPrice = cart.totalPrice - price * productQty;
      cart.products = updatedProducts;
      cart.totalPrice = updatedTotalPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static fetchCart(cb) {
    fs.readFile(p, (err, contentData) => {
      if (err) {
        cb([]);
      } else {
        const cart = JSON.parse(contentData);
        cb(cart);
      }
    });
  }
};
