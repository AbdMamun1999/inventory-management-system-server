const express = require("express");
const procutControllers = require("../controllers/poduct.controllers");
const router = express.Router();


router.route("/bulk-update").patch(procutControllers.bulkUpdateProduct);
router.route("/bulk-delete").delete(procutControllers.bulkDeletedProduct);

router
  .route("/")
  .get(procutControllers.getProducts)
  .post(procutControllers.createProduct);

router
  .route("/:id")
  .get(procutControllers.getOneProduct)
  .patch(procutControllers.updateProductById)
  .delete(procutControllers.deleteProductById);

module.exports = router;
