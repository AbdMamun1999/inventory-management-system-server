const Product = require("../models/Product");

exports.getProductsService = async () => {
  const product = await Product.find({});
  return product;
};

exports.createServiecProduct = async (data) => {
  const product = await Product.create(data);
  return product;
};
