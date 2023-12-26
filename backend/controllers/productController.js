const Product = require("../models/product");
const bodyParser = require("body-parser");
const { error, success } = require("../utlis/responseWrapper");

const addNewProducts = async (req, res) => {
  try {
    const image = req.body.image;
    const id = req.body.id;
    const count = req.body.count;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const minCount = req.body.minCount;

    //const existingProduct = await findProductById(id);
    const existingProduct = await Product.findOne({ id: id });
    if (existingProduct) {
      return res.status(403).json({
        message: "Product already exists",
      });
    }

    const product = await Product.create({
      image: image,
      id: id,
      count: count,
      name: name,
      description: description,
      price: price,
      minCount: minCount,
    });

    return res.status(200).json({
      message: "Product added successfully!",
    });
  } catch (err) {
    return res.status(501).json({
      message: "Server error!",
    });
  }
};

const findProductById = async (id) => {
  const product = await Product.findOne({ id });
  return product;
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(501).json({
      message: "Server error!",
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findOne({ id: req.body.id });
    if (!existingProduct) {
      return res.status(403).json({
        message: "Product doesn't exist",
      });
    }

    existingProduct.count = req.body.count || existingProduct.count;
    existingProduct.name = req.body.name || existingProduct.name;
    existingProduct.description =
      req.body.description || existingProduct.description;
    existingProduct.price = req.body.price || existingProduct.price;
    existingProduct.minCount = req.body.minCount || existingProduct.minCount;

    await existingProduct.save();

    return res.status(200).json({
      message: "Product added successfully!",
    });
  } catch (err) {
    return res.status(501).json({
      message: "Server error!",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.body.id });
    console.log(product);
    // if (!product) {
    //   return res.status(403).json({
    //     message: "Product doesn't exist"
    //   })
    // }

    return res.status(200).json({
      message: "Product deleted successfully!",
    });
  } catch (err) {
    return res.status(501).json({
      message: "Server error!",
    });
  }
};

module.exports = { addNewProducts, getAllProducts, editProduct, deleteProduct };
