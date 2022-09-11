const {
  getProductsService,
  createServiecProduct,
} = require("../services/Product.services");

exports.getProducts = async (req, res, next) => {
  try {
    /* const product = await Product.find({})
          .where("name").equals(/\w/)
          .where('quantity').gt(100)
          .lt(600)
          .limit(2)
          .sort({ quantity: -1 }); */
    const product = await getProductsService();
    res.send(product);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const result = await createServiecProduct(req.body);

    result.save();

    res.status(200).json({
      status: "success",
      message: "Data inserted successfull",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};
