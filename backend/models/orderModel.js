const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9]+$/.test(value);
      },
      message: "ID must be an alpha numeric value.",
    },
  },
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
  },
  orderItems: [
    {
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
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Pending",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
