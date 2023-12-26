const Product = require("../models/product");
const Order = require("../models/orderModel");
const { error, success } = require("../utlis/responseWrapper");

const addNewOrders = async (req, res, next) => {
  const { shippingInfo, orderItems, paymentInfo, totalPrice } = req.body;

  const order = new Order({
    shippingInfo,
    orderItems,
    paymentInfo,
    totalPrice,
    paidAt: Date.now(),
  });

  try {
    await order.save();
    res.send(success(201, "Order added successfully!"));
  } catch (err) {
    console.log(err);
    res.send(error(500, "Error while saving in the database"));
  }
};

const getAllOrders = async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
};

const getLatestOrders = async (req, res, next) => {
  const orders = await Order.find().sort({ createdAt: -1 }).exec();

  res.status(200).json(orders);
};

const updateOrderStatus = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.send(error(404, "Order not found with this Id"));
  }

  if (order.orderStatus === "Delivered") {
    res.send(success(400, "You have already delivered this order"));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.id, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.send(success(200, "true"));
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.count -= quantity;

  await product.save({ validateBeforeSave: false });
}

const deleteOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  await order.remove();

  res.send(success(200, "Order removed successfully"));
};

const updateOrder = async (req, res, next) => {
  console.log(req.body);
  const order = await Order.findOne({ orderId: req.body.orderId });

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  order.paymentInfo.status = "Paid";
  order.orderStatus = "Delivered";

  await order.save();

  return res.status(200).json({
    message: "Order updated successfully!",
  });
};

module.exports = {
  addNewOrders,
  getAllOrders,
  getLatestOrders,
  updateOrderStatus,
  deleteOrder,
  updateOrder,
};
