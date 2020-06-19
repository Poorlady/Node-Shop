const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      products: products,
      docTitle: "Product List",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId, (product) => {
    res.render("shop/product-detail", {
      docTitle: product.title,
      product: product,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      products: products,
      docTitle: "Welcome To Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.fetchCart((cart) => {
    Product.fetchAll((products) => {
      const fullCart = [];
      //loop through the products list and find the same id in cart
      for (const product of products) {
        const sameProduct = cart.products.find(
          (item) => item.id === product.id
        );
        if (sameProduct) {
          //if the product is same then modified to new object
          const modifiedProduct = {
            productData: product,
            quantity: sameProduct.quantity,
          };
          fullCart.push(modifiedProduct);
        }
      }
      // console.log(fullCart);
      res.render("shop/cart", {
        docTitle: "Your Cart",
        path: "/cart",
        cart: fullCart,
      });
    });
  });
};

exports.postDeleteCartItem = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId, (product) => {
    console.log(product);
    Cart.deleteProduct(productId, product.price);
    res.redirect("/cart");
  });
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect("/cart");
};

exports.getOrder = (req, res, next) => {
  res.render("shop/order", { docTitle: "Your Order", path: "/order" });
};

exports.getCheckOut = (req, res, next) => {
  res.render("shop/checkout", { docTitle: "Checkout", path: "/checkout" });
};
