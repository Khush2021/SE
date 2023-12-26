const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9]+$/.test(value);
      },
      message: "ID must be an alpha numeric value.",
    },
  },
  count: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  minCount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
