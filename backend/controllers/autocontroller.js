const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");
const { error, success } = require("../utlis/responseWrapper");

dotenv.config();
// Import your User model here

// Signup Controller
const signUpController = async (req, res) => {
  try {
    const name = req.body.name;
    const role = req.body.role;
    const email = req.body.email;
    const password = req.body.password;
    const phoneNo = req.body.phoneNo;

    if (!email || !password) {
      return res.send(error(400, "both field are required"));
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      console.log(req.body);
      const user = await User.create({
        email: email,
        password: hash,
        role: role,
        name: name,
        phoneNo: phoneNo,
      });

      return res.status(200).json({
        message: "Accountant updated successfully!",
      });

      try {
        // res.status(201).json({
        //   message: "Account created successfully!",
        // });
      } catch (err) {
        if (err.name === "ValidationError") {
          // res.status(400).json({
          //   error: err.message,
          // });
          res.send(error(400, err.message));
        } else {
          // res.status(500).json({
          //   error: "Something went wrong.",
          // });
          res.send(error(500, "error while saving in dataBase"));
        }
      }
    }
  } catch (e) {
    // res.status(500).json({
    //   error: "Something went wrong.",
    // });
    res.send(error(500, "Couldn't Create an Account"));
  }
};

// Login Controller
const loginController = async (req, res) => {
  console.log("login Invoked");
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      // return res.status(400).json({
      //   error: "No value parsed in the request body.",
      // });
      return res.send(error(400, "both field are required"));
    }

    if (typeof password !== "string") {
      // return res.status(400).json({
      //   error: "Password must be a string.",
      // });
      return res.send(error(400, "Password must be a string"));
    }

    try {
      const foundUser = await User.findOne({ email: email });

      if (foundUser) {
        const passwordMatch = await bcrypt.compare(
          password,
          foundUser.password
        );

        if (passwordMatch) {
          const accessToken = generateAccessToken({
            _id: foundUser._id,
            email: foundUser.email,
          });

          const refreshToken = generaterefreshAccessToken({
            _id: foundUser._id,
            email: foundUser.email,
          });

          // res
          //   .status(201)
          //   .cookie("refreshToken", refreshToken, {
          //     httpOnly: true,
          //   })
          //   .json({ accessToken });

          res
            .cookie("refreshToken", refreshToken, { httpOnly: true })
            .send(error(201, { accessToken, foundUser }));

          res.status;
        } else {
          // res.status(401).json({
          //   error: "Incorrect password.",
          // });
          res.send(error(401, "Incorrect password."));
        }
      } else {
        // res.status(404).json({
        //   error: "User not found.",
        // });
        res.send(error(401, "User not found."));
      }
    } catch (e) {
      // console.error(error);
      // res.status(500).json({
      //   error: "Something went wrong.",
      // });
      res.send(error(500, "Couldn't find the user with this email"));
    }
  } catch (e) {
    // res.status(500).json({
    //   error: "Something went wrong.",
    // });
    res.send(error(500, "Email id or password field is empty"));
  }
};

const refreshAccessTokenController = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    // return res.status(401).send(" RefreshToken is not present ");
    return res.send(error(401, " RefreshToken is not present "));
  }

  const refreshToken = cookies.jwt;

  try {
    const decode = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY
    );
    const _id = decode._id;
    const email = decode.email;

    const accessToken = generateAccessToken({
      _id: _id,
      email: email,
    });

    return res.status(201).json({ accessToken });
  } catch (e) {
    // console.log(error);
    // return res.status(401).send();
    return res.send(error(401, "Invalid RefreshToken key"));
  }
};

const generaterefreshAccessToken = async (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: "1y",
    });

    return token; // Don't forget to return the token
  } catch (e) {
    // console.error(error);
    res.send(error(401, "Couldn't generate a refresh token"));
  }
};

const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "60s",
    });

    return token; // Don't forget to return the token
  } catch (e) {
    // console.error(error);
    res.send(error(401, "Couldn't generate a access token"));
  }
};

module.exports = {
  signUpController,
  loginController,
  refreshAccessTokenController,
};
