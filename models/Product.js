const mongoose = require("mongoose");
// schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please provide a name for this product"],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      require: true,
      min: [0, "price can't negative"],
    },
    unit: {
      type: String,
      require: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Quantity must be an integer",
    },
    status: {
      type: String,
      require:true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },
    /*   createDAt: {
      type: Date,
      defalut: Date.now,
    },
    upadatedAt: {
      type: Date,
      default: Date.now,
    }, */
    /*  supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
      },
      categories: [
        {
          name: {
            type: String,
            require: true,
          },
          _id: mongoose.Schema.Types.ObjectId,
        },
      ], */
  },
  {
    timestamps: true,
  }
);

// mongoose middlewares for saving data: pre/post
// pre middleware: Before saving data
productSchema.pre("save", function (next) {
  //   console.log(this);
  //   this
  if (this.quantity === 0) {
    this.status = "out-of-stock";
  }
  next();
});

/* // post middleware: After saving data
  productSchema.post("save", function (doc, next) {
    console.log("After saving data");
    next();
  }); */

productSchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};

// SCHEME -> MODEL -> QUERY
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
