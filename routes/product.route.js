const express = require("express");
const procutControllers = require("../controllers/poduct.controllers");
const router = express.Router();

router.route("/")
.get(procutControllers.getProducts)
.post(procutControllers.createProduct)

// router.route('/:id').get()

module.exports = router;
