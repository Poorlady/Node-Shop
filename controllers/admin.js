const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    edit: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const data = {
    id: null,
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
  };
  const product = new Product(data);
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  const isEdit = req.query.edit;
  const { productId } = req.params;
  Product.findById(productId, (product) => {
    if (!product) {
      res.redirect("/");
    }
    res.render("admin/edit-product", {
      docTitle: "Edit Product",
      path: "/admin/edit-product",
      edit: isEdit,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;
  const data = {
    id: productId,
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
  };
  const product = new Product(data);
  product.save();
  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      products: products,
      docTitle: "Admin Product List",
      path: "/admin/products",
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.delete(productId);
  res.redirect("/admin/products");
};
