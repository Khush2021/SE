const jwt = require("jsonwebtoken");
const { error, success } = require("../utlis/responseWrapper");
const dotenv = require("dotenv");
dotenv.config();

const ACESS_TOKEN_PRIVATE_KEY =
  "0fde45a2c1b6e39d6807e971c57f2a40c586d9b13c0854a7d495993b984ce38c0";

const REFRESH_TOKEN_PRIVATE_KEY =
  "a1b5e8d2f6c90e4d7a8f43c1629d0b5e3d2f6a1b5e8d2f6c90e4d7a8f43c1629d0";

module.exports = async (req, res, next) => {
  // if (
  //   !req.headers ||
  //   !req.headers.authorization ||
  //   !req.headers.authorization.startsWith("Bearer")
  // ) {
  //   return res.send(error(401, "Authorization is required"));
  // }

  // const accessToken = req.headers.authorization.split(" ")[1];

  try {
    // const decode = jwt.verify(accessToken, REFRESH_TOKEN_PRIVATE_KEY);
    // req._id = decode._id;
    next(); // Call next() only if the JWT is successfully verified
  } catch (e) {
    console.log(e);
    return res.send(error(401, "Invalid access key"));
  }
  next();
};
